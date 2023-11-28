import { MutableRefObject, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTableOwnProps } from './DataTableInterfaces';
import ReplayIcon from '@mui/icons-material/Replay';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Tooltip } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { BaseEntity } from '../../models/BaseEntity';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ActionsRenderer } from './ActionsRenderer';
import { useAppSelector } from '../../reducers/Store';
import { isReadingSelector, isSubmittingSelector } from '../../reducers/ApiCallsReducer';
import { Working } from '../common/Working';

export const DataTable = <EntityType extends BaseEntity>(props: DataTableOwnProps<EntityType>) => {
  const { id, columns, rowsData, manager } = props;

  const isReading: boolean = useAppSelector(isReadingSelector);
  const isSubmitting: boolean = useAppSelector(isSubmittingSelector);
  const { t } = useTranslation();
  const gridRef = useRef<AgGridReact>() as MutableRefObject<AgGridReact>;

  return (
    <>
      <Tooltip title={isReading ? t('tooltip_reading') : isSubmitting ? t('tooltip_submitting') : ''}>
        <span>
          <Button
            id={`${id}-button-reload`}
            variant="outlined"
            startIcon={<ReplayIcon />}
            onClick={manager.read}
            disabled={isReading || isSubmitting}
            sx={{ margin: 1 }}
          >
            {t('reload')}
          </Button>
        </span>
      </Tooltip>
      <Tooltip title={isReading ? t('tooltip_reading') : isSubmitting ? t('tooltip_submitting') : ''}>
        <span>
          <Button
            id={`${id}-button-create`}
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={manager.create}
            disabled={isReading || isSubmitting}
            sx={{ margin: 1 }}
          >
            {t('create')}
          </Button>
        </span>
      </Tooltip>
      {!isReading && !isSubmitting && (
        <Box className="ag-theme-alpine" sx={{ padding: 1 }}>
          <AgGridReact<EntityType>
            ref={gridRef}
            rowData={rowsData}
            columnDefs={[
              ...columns,
              {
                field: 'actions',
                cellRenderer: ActionsRenderer,
                cellRendererParams: {
                  id: 'todo-table',
                  actionsActive: true,
                  manager,
                },
              } as any,
            ]}
            defaultColDef={{ sortable: true }}
            domLayout="autoHeight"
          />
        </Box>
      )}
      {(isReading || isSubmitting) && <Working isReading isSubmitting />}
    </>
  );
};
