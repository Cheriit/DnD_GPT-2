'use strict';
import * as React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Heading,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from 'components/ColorModeSwitcher';
import { AppProvider } from 'context';
import { Form } from './Form';
import { Typer } from './Typer';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <ChakraProvider theme={theme}>
        <Grid p={3}>
          <Box textAlign="right" fontSize="xl" mb={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
          </Box>
          <Box textAlign="center" fontSize="xl" mb={3}>
            <Heading as="h1" size="xl" isTruncated>
              ⚔️ D&D Character Backstory Generator 🐉
            </Heading>
          </Box>
          <Box textAlign="center" fontSize="xl">
            <Form />
            <Typer />
          </Box>
        </Grid>
      </ChakraProvider>
    </AppProvider>
  );
};
