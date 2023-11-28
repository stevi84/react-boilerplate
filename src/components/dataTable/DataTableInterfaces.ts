import { ColDef } from 'ag-grid-community';

export enum CrudMode {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
}

export interface EntityManager<EntityType> {
  create: () => void;
  read: () => void;
  update: (entity: EntityType) => void;
  delete: (entity: EntityType) => void;
  getEmpty: () => EntityType;
}

export interface DataTableOwnProps<EntityType> {
  id: string;
  columns: ColDef<EntityType>[];
  rowsData: EntityType[];
  manager: EntityManager<EntityType>;
}
