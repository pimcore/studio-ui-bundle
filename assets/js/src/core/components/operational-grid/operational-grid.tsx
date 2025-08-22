import { GridProps } from "@Pimcore/types/components/types";
import React from "react";
import { Grid } from "../grid/grid";
import { OperationalGridProvider, useOperationalGridContext } from "./provider/operational-grid-provider";
import { useOperations } from "./hooks/use-operations";

export interface OperationalGridProps {
  value: GridProps['data'],
  onChange?: (value: GridProps['data']) => void
  gridProps: GridProps;
  children: React.ReactNode;
}

const OperationalGrid = (props: OperationalGridProps): React.JSX.Element => {
  const { value, onChange, children, gridProps } = props;

  const onUpdateCellData: GridProps['onUpdateCellData'] = (event) => {
    const { columnId, rowIndex, value: newCellValue } = event
    const newValue = [...value]
    newValue[rowIndex] = { ...newValue[rowIndex], [columnId]: newCellValue }

    onChange?.(newValue)
  }

  const finalGridProps = {
    ...gridProps,
    data: value,
    onUpdateCellData: gridProps.onUpdateCellData ?? onUpdateCellData,
  }

  return (
    <OperationalGridProvider value={value} onChange={onChange} gridProps={finalGridProps}>
      {children}
    </OperationalGridProvider>
  )
};

OperationalGrid.Grid = () => {
  const {gridProps} = useOperationalGridContext();

  return (
    <Grid {...gridProps} />
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
