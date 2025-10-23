import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';

// AG Grid styles (Community edition)
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

/**
 * Generic, reusable data grid component
 *
 * Props:
 * - columns: string[] (list of field names). If omitted, derived from data keys.
 * - data: Array<Record<string, any>>
 * - allowEditing: boolean (cells editable when true)
 * - pageSize: number (defaults to 20)
 * - height: CSS size for grid container (defaults to 500px)
 * - onDataChange?: (rows) => void (called after an edit)
 */
export default function Grid({
  columns,
  data,
  allowEditing = false,
  pageSize = 20,
  height = '500px',
  onDataChange,
}) {
  const [rowData, setRowData] = useState(Array.isArray(data) ? data : []);

  useEffect(() => {
    setRowData(Array.isArray(data) ? data : []);
  }, [data]);

  const effectiveColumns = useMemo(() => {
    if (Array.isArray(columns) && columns.length > 0) return columns;
    const firstRow = (Array.isArray(data) && data.length > 0) ? data[0] : undefined;
    return firstRow ? Object.keys(firstRow) : [];
  }, [columns, data]);

  const columnDefs = useMemo(() => {
    return effectiveColumns.map((fieldName) => ({
      headerName: fieldName,
      field: fieldName,
      editable: allowEditing,
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
    }));
  }, [effectiveColumns, allowEditing]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  const handleCellValueChanged = useCallback(
    (event) => {
      // event.data is the updated row object (mutated by AG Grid)
      // Ensure our state reflects the change and notify parent
      setRowData((prev) => {
        const next = prev.map((row) => (row === event.node.data ? event.data : row));
        if (typeof onDataChange === 'function') {
          onDataChange(next);
        }
        return next;
      });
    },
    [onDataChange]
  );

  return (
    <div className="ag-theme-alpine" style={{ width: '100%', height }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        animateRows={true}
        suppressClickEdit={!allowEditing}
        onCellValueChanged={allowEditing ? handleCellValueChanged : undefined}
        // Pagination
        pagination={true}
        paginationPageSize={pageSize}
      />
    </div>
  );
}
