import { useOperationalGridContext } from "../provider/operational-grid-provider";
import { RowSelectionState, ColumnDef } from "@tanstack/react-table";

export interface UseOperationsReturn {
  addRow: (data?: any) => void;
  clearAll: () => void;
  deleteSelectedRows: () => void;
  clearSelectedRows: () => void;
  getSelectedRowsData: () => any[];
  addColumn: (column: ColumnDef<any>, defaultValue?: any) => void;
  removeColumn: (columnId: string) => void;
  updateColumn: (columnId: string, updatedColumn: ColumnDef<any>) => void;
}

export const useOperations = (): UseOperationsReturn => {
  const { value, onChange, finalGridProps, columns, onColumnsChange } = useOperationalGridContext();
  const selectedRows = finalGridProps.selectedRows;
  const onSelectedRowsChange = finalGridProps.onSelectedRowsChange;

  const addRow = (data?: any) => {
    const newValue = [...value, data];
    onChange?.(newValue);
  };

  const clearAll = () => {
    onChange?.([]);
    onSelectedRowsChange?.({});
  };

  const deleteSelectedRows = () => {
    if (!selectedRows) return;
    
    const selectedIndices = Object.keys(selectedRows)
      .filter(key => selectedRows[key])
      .map(key => parseInt(key, 10))
      .sort((a, b) => b - a); // Sort in reverse order to avoid index shifting

    let newValue = [...value];
    selectedIndices.forEach(index => {
      newValue.splice(index, 1);
    });

    onChange?.(newValue);
    onSelectedRowsChange?.({});
  };

  const clearSelectedRows = () => {
    onSelectedRowsChange?.({});
  };

  const getSelectedRowsData = () => {
    if (!selectedRows) return [];
    
    return Object.keys(selectedRows)
      .filter(key => selectedRows[key])
      .map(key => parseInt(key, 10))
      .filter(index => index < value.length)
      .map(index => value[index]);
  };

  const addColumn = (column: ColumnDef<any>, defaultValue: any = null) => {
    const newColumns = [...columns, column];
    onColumnsChange?.(newColumns);

    // Add default value to existing rows for the new column
    const columnId = 'accessorKey' in column ? column.accessorKey : column.id;
    if (columnId && value.length > 0) {
      const newValue = value.map(row => ({
        ...row,
        [columnId]: row[columnId as keyof typeof row] !== undefined ? row[columnId as keyof typeof row] : defaultValue
      }));
      onChange?.(newValue);
    }
  };

  const removeColumn = (columnId: string) => {
    const newColumns = columns.filter(col => {
      // Handle both accessorKey (string) and id (string) properties
      const colId = 'accessorKey' in col ? col.accessorKey : col.id;
      return colId !== columnId;
    });
    onColumnsChange?.(newColumns);

    // Remove the property from existing rows
    if (value.length > 0) {
      const newValue = value.map(row => {
        const { [columnId]: removedProperty, ...restRow } = row;
        return restRow;
      });
      onChange?.(newValue);
    }
  };

  const updateColumn = (columnId: string, updatedColumn: ColumnDef<any>) => {
    const newColumns = columns.map(col => {
      // Handle both accessorKey (string) and id (string) properties
      const colId = 'accessorKey' in col ? col.accessorKey : col.id;
      return colId === columnId ? updatedColumn : col;
    });
    onColumnsChange?.(newColumns);
  };

  return {
    addRow,
    clearAll,
    deleteSelectedRows,
    clearSelectedRows,
    getSelectedRowsData,
    addColumn,
    removeColumn,
    updateColumn,
  };
};
