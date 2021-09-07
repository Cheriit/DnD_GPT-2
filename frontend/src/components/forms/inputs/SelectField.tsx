import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { UseFormRegisterReturn } from 'react-hook-form';

type SelectFieldProps = {
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
  p?: number;
  isRequired?: boolean;
  defaultValue?: string;
  options: string[];
};

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  register,
  error,
  p,
  isRequired,
  defaultValue,
  options,
}) => {
  const optionsElements = options.map(
    (
      option: string,
    ): React.DetailedHTMLProps<
      React.OptionHTMLAttributes<HTMLOptionElement>,
      HTMLOptionElement
    > => (
      <option key={option} value={option}>
        {option}
      </option>
    ),
  );

  return (
    <FormControl
      isInvalid={!!error}
      p={p ?? 3}
      isRequired={isRequired}
    >
      <FormLabel>{label}</FormLabel>
      <Select {...register} defaultValue={defaultValue}>
        {optionsElements}
      </Select>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  register: PropTypes.any.isRequired,
  error: PropTypes.string,
  p: PropTypes.number,
  isRequired: PropTypes.bool,
  defaultValue: PropTypes.string,
  options: PropTypes.array.isRequired,
};
