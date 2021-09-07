import * as yup from 'yup';

export const CharacterSchema = yup.object().shape({
  name: yup.string().required().label('Character name'),
  race: yup.string().required().label('Race'),
  characterClass: yup.string().required().label('Class'),
});
