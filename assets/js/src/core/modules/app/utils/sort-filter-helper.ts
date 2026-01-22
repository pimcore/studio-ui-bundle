import { SortingState } from "@tanstack/react-table";
import { SortFilter } from "../types/sort-filter";
import { isNil } from "lodash";

export function transformToSortingState(sortFilter: SortFilter): SortingState {
  return [{
    id: sortFilter.key,
    desc: sortFilter.direction === 'DESC'
  }]
}

export function transformToSortFilter(sorting: SortingState | null): SortFilter | null {
  if (isNil(sorting) || sorting.length === 0) {
    return null;
  }

  return {
    key: sorting[0].id as string,
    direction: sorting[0].desc ? 'DESC' : 'ASC'
  };
}