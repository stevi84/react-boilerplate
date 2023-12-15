import React, { useEffect } from 'react';
import { useNotifier } from '../../hooks/UseNotifier';
import { Header } from './Header';
import { CurrentUser } from '../../models/CurrentUser';
import { useAppDispatch, useAppSelector } from '../../reducers/Store';
import { currentUserSelector } from '../../reducers/CurrentUserReducer';
import { readCurrentUser } from '../../thunks/CurrentUserThunks';
import { useTranslation } from 'react-i18next';
import { Locale } from '../../globals/Translations';
import { Working } from './Working';
import { Right } from '../../globals/RolesAndRights';
import { Authorization } from './Authorization';
import { NotAuthorized } from './NotAuthorized';

interface MainLayoutProps {
  allowedAccessRights: Right[];
}

export const MainLayout = (props: React.PropsWithChildren<MainLayoutProps>) => {
  const { allowedAccessRights, children } = props;

  const currentUser: CurrentUser = useAppSelector(currentUserSelector);
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const lang: Locale = i18n.language as Locale;

  useNotifier();

  useEffect(() => {
    if (!currentUser.loginName) {
      dispatch(readCurrentUser(lang));
    }
  }, []);

  return !currentUser.loginName ? (
    <Working />
  ) : (
    <Authorization
      allowedAccessRights={allowedAccessRights}
      WrappedElement={
        <>
          <Header />
          {children}
        </>
      }
      NotAuthorizedElement={<NotAuthorized />}
    />
  );
};
