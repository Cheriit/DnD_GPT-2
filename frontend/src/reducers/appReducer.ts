import { initialState } from 'context';
import { AppAction, AppActionType, AppContextType } from 'types';

const appReducer: React.Reducer<AppContextType, AppAction> = (
  state: AppContextType = initialState,
  action: AppAction,
): AppContextType => {
  switch (action.type) {
    case AppActionType.SET_BACKSTORY:
      return {
        ...state,
        backstory: action.payload.backstory,
      };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
};

export { appReducer };
