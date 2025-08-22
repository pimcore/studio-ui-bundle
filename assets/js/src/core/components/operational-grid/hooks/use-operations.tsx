import { useOperationalGridContext } from "../provider/operational-grid-provider";
import { RowSelectionState } from "@tanstack/react-table";

export interface UseOperationsReturn {
  addRow: (data?: any) => void;
  clearAll: () => void;
  deleteSelectedRows: () => void;
  clearSelectedRows: () => void;
  getSelectedRowsData: () => any[];
}

export const useOperations = (): UseOperationsReturn => {
  const { value, onChange, finalGridProps } = useOperationalGridContext();
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

  return {
    addRow,
    clearAll,
    deleteSelectedRows,
    clearSelectedRows,
    getSelectedRowsData,
  };
};
