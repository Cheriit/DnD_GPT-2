import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { UseFormRegisterReturn } from 'react-hook-form';

type TextInputFieldProps = {
  label: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: string;
  p?: number;
  isRequired?: boolean;
  defaultValue?: string;
};

export const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  placeholder,
  register,
  error,
  p,
  isRequired,
  defaultValue,
}) => {
  return (
    <FormControl
      isInvalid={!!error}
      p={p ?? 3}
      isRequired={isRequired}
    >
      <FormLabel>{label}</FormLabel>
      <Input
        placeholder={placeholder}
        {...register}
        defaultValue={defaultValue}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

TextInputField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  register: PropTypes.any.isRequired,
  error: PropTypes.string,
  p: PropTypes.number,
  isRequired: PropTypes.bool,
  defaultValue: PropTypes.string,
};
