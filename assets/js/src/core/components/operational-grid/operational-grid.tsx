import { GridProps } from "@Pimcore/types/components/types";
import React from "react";
import { Grid } from "../grid/grid";
import { OperationalGridProvider, useOperationalGridContext } from "./provider/operational-grid-provider";
import { useOperations } from "./hooks/use-operations";
import { RowSelectionState, ColumnDef } from "@tanstack/react-table";

export interface OperationalGridProps extends Omit<GridProps, 'data' | 'onUpdateCellData'> {
  value: GridProps['data'];
  onChange?: (value: GridProps['data']) => void;
  onColumnsChange?: (columns: Array<ColumnDef<any>>) => void;
  children: React.ReactNode;
  onUpdateCellData?: GridProps['onUpdateCellData'];
}

const OperationalGrid = (props: OperationalGridProps): React.JSX.Element => {
  const { value, onChange, onColumnsChange, children, onUpdateCellData, columns = [], ...gridProps } = props;

  const defaultOnUpdateCellData: GridProps['onUpdateCellData'] = (event) => {
    const { columnId, rowIndex, value: newCellValue } = event
    const newValue = [...value]
    newValue[rowIndex] = { ...newValue[rowIndex], [columnId]: newCellValue }

    onChange?.(newValue)
  }

  const finalGridProps: GridProps = {
    ...gridProps,
    columns,
    data: value,
    onUpdateCellData: onUpdateCellData ?? defaultOnUpdateCellData,
  }

  return (
    <OperationalGridProvider 
      value={value} 
      onChange={onChange} 
      columns={columns}
      onColumnsChange={onColumnsChange}
      finalGridProps={finalGridProps}
    >
      {children}
    </OperationalGridProvider>
  )
};

OperationalGrid.Grid = () => {
  const {finalGridProps} = useOperationalGridContext();

  return (
    <Grid {...finalGridProps} />
  )
}

export interface OperationsProps {
  children: (operations: ReturnType<typeof useOperations>) => React.ReactNode;
}

OperationalGrid.Operations = ({children}: OperationsProps) => {
  const operations = useOperations();

  return children(operations)
}

export {OperationalGrid};
