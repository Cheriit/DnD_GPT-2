enum AppActionType {
  SET_BACKSTORY = 'SET_BACKSTORY',
}

type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type AppPayload = {
  [AppActionType.SET_BACKSTORY]: {
    backstory: string[];
  };
};

type AppAction = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];

export type { AppAction };
export { AppActionType };
