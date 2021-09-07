import { useContext } from 'react';
import { AppAction, AppContextType, ReducerHook } from 'types';
import { AppContext } from 'context';

export const useApp = (): ReducerHook<AppContextType, AppAction> => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      `useApp hook must be used within a ListContextProvider`,
    );
  }

  const { state, dispatch } = context;

  return [state, dispatch];
};
