import { createSelectedRowsContext } from "@Pimcore/components/grid/contexts/selected-rows-context";
import { RowSelectionState } from "@tanstack/react-table";

export const {
  SelectedRowsProvider,
  useSelectedRowsContext
} = createSelectedRowsContext<RowSelectionState>()