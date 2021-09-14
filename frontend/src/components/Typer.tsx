import React from 'react';
import { useApp } from 'hooks';
import Typical from 'react-typical';
export const Typer: React.FC = () => {
  const [{ backstory }] = useApp();

  if (backstory[0] !== [''])
    return (
      <div className="TypistExample">
        <Typical steps={backstory} key={backstory}></Typical>
      </div>
    );
  else return <div></div>;
};
