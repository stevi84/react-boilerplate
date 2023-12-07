import React from 'react';
import { useNotifier } from '../../hooks/UseNotifier';
import { Header } from './Header';

export const MainLayout = (props: React.PropsWithChildren) => {
  useNotifier();

  return (
    <>
      <Header />
      {props.children}
    </>
  );
};
