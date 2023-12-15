import { MainLayout } from '../common/MainLayout';
import { NotAuthorized } from '../common/NotAuthorized';

export const NotAuthorizedDialog = () => {
  return (
    <MainLayout allowedAccessRights={['UNRESTRICTED']}>
      <NotAuthorized />
    </MainLayout>
  );
};
