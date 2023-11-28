

type ColumnWithValues = { column: string; allColumns: Record<string, boolean>; mobileColumns: Record<string, boolean> };

export const customDataGridColumns = (
  columnsWithValues: readonly ColumnWithValues[],
  keyToReturn: 'allColumns' | 'mobileColumns'
): Record<string, boolean> => {

  return columnsWithValues.reduce((columns, { [keyToReturn]: columnsToMerge }) => {

    return { ...columns, ...columnsToMerge };

  }, {} as Record<string, boolean>);
}