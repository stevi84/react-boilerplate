import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { BaseEntity } from '../../models/BaseEntity';
import { EntityManager } from './DataTableInterfaces';
import { ICellRendererParams } from 'ag-grid-community';
import { Authorization } from '../common/Authorization';

interface ButtonCellRendererProps<EntityType> {
  id: string;
  manager: EntityManager<EntityType>;
}

export const ActionsRenderer = <EntityType extends BaseEntity>(
  props: ButtonCellRendererProps<EntityType> & ICellRendererParams<EntityType>
) => {
  const { id, data, manager } = props;

  const { t } = useTranslation();

  return (
    <Authorization
      allowedAccessRights={[manager.editRight]}
      WrappedElement={
        <>
          <Tooltip title={t('edit')}>
            <span>
              <IconButton id={`${id}-${data!.id}-button-edit`} color="primary" onClick={() => manager.update(data!)}>
                <EditIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title={t('delete')}>
            <span>
              <IconButton id={`${id}-${data!.id}-button-delete`} color="primary" onClick={() => manager.delete(data!)}>
                <DeleteIcon />
              </IconButton>
            </span>
          </Tooltip>
        </>
      }
    />
  );
};
