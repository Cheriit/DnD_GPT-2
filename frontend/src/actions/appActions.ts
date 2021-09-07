import { AppActionType, AppAction } from 'types';

export const setBackstory = (backstory: string[]): AppAction => {
  return {
    type: AppActionType.SET_BACKSTORY,
    payload: { backstory },
  };
};
