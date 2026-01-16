export interface ColumnFilter {
  type: string
  filterValue: any
}

export interface DateFromColumnFilter extends ColumnFilter {
  key: string
  type: string
  filterValue: {
    operator: string
    value: string | null
  } | string | number
}

export interface NumberColumnFilter extends ColumnFilter {
  type: string
  filterValue: number
}

export interface BooleanColumnFilter extends ColumnFilter {
  type: string
  filterValue: number
}

export interface StringColumnFilter extends ColumnFilter {
  type: string
  filterValue: string
}