from flask import Flask, request, jsonify
import torch
from transformers import GPT2Tokenizer
import torch.nn.functional as F
from flask_cors import CORS



def generate(
  model,
  tokenizer,
  prompt,
  entry_length=100,
  top_p=0.8,
  temperature=1.,
):
    model.eval()
    generated_num = 0
    generated_list = []

    filter_value = -float("Inf")

    with torch.no_grad():

        entry_finished = False
        generated = torch.tensor(tokenizer.encode(prompt)).unsqueeze(0)

        for _ in range(entry_length):
            outputs = model(generated, labels=generated)
            _, logits = outputs[:2]
            logits = logits[:, -1, :] / (temperature if temperature > 0 else 1.0)

            sorted_logits, sorted_indices = torch.sort(logits, descending=True)
            cumulative_probs = torch.cumsum(F.softmax(sorted_logits, dim=-1), dim=-1)

            sorted_indices_to_remove = cumulative_probs > top_p
            sorted_indices_to_remove[..., 1:] = sorted_indices_to_remove[
                ..., :-1
            ].clone()
            sorted_indices_to_remove[..., 0] = 0

            indices_to_remove = sorted_indices[sorted_indices_to_remove]
            logits[:, indices_to_remove] = filter_value

            next_token = torch.multinomial(F.softmax(logits, dim=-1), num_samples=1)
            generated = torch.cat((generated, next_token), dim=1)

            if next_token in tokenizer.encode("..."):
                entry_finished = True

            if entry_finished:
                generated_num = generated_num + 1
                output_list = list(generated.squeeze().numpy())
                output_text = tokenizer.decode(output_list)
                generated_list.append(output_text)
                break

        if not entry_finished:
            output_list = list(generated.squeeze().numpy())
            output_text = f"{tokenizer.decode(output_list)}..."
            generated_list.append(output_text)

    return generated_list

app = Flask(__name__)
CORS(app)
map_location='cpu'
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
model = torch.load('./gpt2_dnd_model.pt', map_location=map_location).to('cpu')


@app.route('/api', methods=['POST'])
def apiCall():
    data = request.get_json()
    ret_data =  generate(model, tokenizer, f"I am {data.get('name')} a {data.get('class')} {data.get('race')}.");
    response = jsonify({'backstory': ret_data[0]})
    return response