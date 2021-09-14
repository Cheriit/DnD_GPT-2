import React from 'react';
import { ChatIcon } from '@chakra-ui/icons';
import { Button, InputGroup, Box } from '@chakra-ui/react';
import { useApp } from 'hooks';
import { setBackstory } from 'actions';
import { FormInputs } from 'types';
import { CharacterSchema } from 'schemas';
import { TextInputField } from './forms/inputs';
import { yupResolver } from '@hookform/resolvers/yup';
import { SelectField } from './forms/inputs/SelectField';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export const Form: React.FC = () => {
  const [{ availableClasses, availableRaces }, dispatch] = useApp();
  const [name, characterClass, race] = ['', '', ''];

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(CharacterSchema),
  });
  const onSubmit = async ({
    name,
    race,
    characterClass,
  }: FormInputs) => {
    dispatch(setBackstory(['']));
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    const response = await axios.post('http://127.0.0.1:5000/api', {
      name,
      class: characterClass,
      race,
    });
    if (response.status === 200) {
      dispatch(setBackstory([response.data.backstory]));
    } else {
      dispatch(setBackstory(['An error has occured...']));
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <InputGroup>
          <TextInputField
            label="Character name"
            placeholder="Shriker"
            register={register('name')}
            error={errors?.name?.message}
            isRequired={true}
            defaultValue={name}
          />{' '}
          <SelectField
            label="Class"
            options={availableClasses}
            register={register('characterClass')}
            defaultValue={characterClass}
            error={errors?.characterClass?.message}
            isRequired={true}
          ></SelectField>
          <SelectField
            label="Race"
            options={availableRaces}
            register={register('race')}
            defaultValue={race}
            error={errors?.race?.message}
            isRequired={true}
          ></SelectField>
        </InputGroup>
      </Box>
      <Box mt={10} mb={10}>
        <Button
          variant="outline"
          colorScheme="facebook"
          isLoading={isSubmitting}
          bottom="0"
          type="submit"
          disabled={
            !!errors.characterClass || !!errors.name || !!errors.race
          }
          size="md"
        >
          <ChatIcon mr={3} /> Generate backstory
        </Button>
      </Box>
    </form>
  );
};
