import React, { createContext, useReducer, useMemo } from 'react';
import { AppContextType, AppAction } from 'types';
import PropTypes from 'prop-types';
import { appReducer } from 'reducers';

const initialState: AppContextType = {
  backstory: [],
  availableClasses: [
    'Barbarian',
    'Bard',
    'Cleric',
    'Druid',
    'Fighter',
    'Monk',
    'Paladin',
    'Ranger',
    'Rogue',
    'Sorcerer',
    'Warlock',
    'Wizard',
    'Artificer',
  ],
  availableRaces: [
    'Aarakocra',
    'Aasimar',
    'Bugbear',
    'Centaur',
    'Changeling',
    'Dragonborn',
    'Dwarf',
    'Elf',
    'Firbolg',
    'Genasi',
    'Gnome',
    'Goblin',
    'Goliath',
    'Half-Elf',
    'Half-Orc',
    'Halfling',
    'Hobgoblin',
    'Human',
    'Kalashtar',
    'Kenku',
    'Kobold',
    'Lizardfolk',
    'Minotaur',
    'Orc',
    'Satyr',
    'Shifter',
    'Tabaxi',
    'Tiefling',
    'Triton',
    'Warforged',
  ],
};

const AppContext = createContext<{
  state: AppContextType;
  dispatch: React.Dispatch<AppAction>;
}>({ state: initialState, dispatch: () => null });

const AppProvider: React.FC = (props) => {
  const [state, dispatch]: [
    AppContextType,
    React.Dispatch<AppAction>,
  ] = useReducer<React.Reducer<AppContextType, AppAction>>(
    appReducer,
    initialState,
  );

  const value: {
    state: AppContextType;
    dispatch: React.Dispatch<AppAction>;
  } = useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [state]);

  return <AppContext.Provider value={value} {...props} />;
};

AppProvider.propTypes = {
  children: PropTypes.node,
};

export { AppContext, initialState, AppProvider };
