import { useOperationalGridContext } from "../provider/operational-grid-provider";

export interface UseOperationsReturn {
  addRow: (data?: any) => void;
}

export const useOperations = (): UseOperationsReturn => {
  const { value, onChange } = useOperationalGridContext();

  const addRow = (data?: any) => {
    const newValue = [...value, data];
    onChange?.(newValue);
  };

  return {
    addRow,
  };
};
