import React from 'react';
import { useApp } from 'hooks';
import Typical from 'react-typical';
export const Typer: React.FC = () => {
  const [{ backstory }] = useApp();

  return (
    <div className="TypistExample">
      <Typical steps={backstory}></Typical>
    </div>
  );
};
