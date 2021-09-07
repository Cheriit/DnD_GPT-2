from flask import Flask, request
import torch
from transformers import GPT2Tokenizer

def generate(
  model,
  tokenizer,
  prompt,
  entry_count=6,
  entry_length=200,
  top_p=0.8,
  temperature=1.,
):
    model.eval()
    generated_num = 0
    generated_list = []

    filter_value = -float("Inf")

    with torch.no_grad():

        for _ in range(entry_count):

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
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
model = torch.load('./gpt2_dnd_model.pt')


@app.route('/api', methods=['POST'])
def apiCall():
    generate(model.to('cpu'), tokenizer, f"I am {request.form.get('name')} a {request.form.get('class')} {request.form.get('race')}.", entry_count=1);
