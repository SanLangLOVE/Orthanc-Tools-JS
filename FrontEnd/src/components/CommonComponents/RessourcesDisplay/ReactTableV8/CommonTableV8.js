import React, { useEffect, useMemo, useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
    getExpandedRowModel,
} from "@tanstack/react-table";

import Paginate from "./Tools/Paginate";
import Filter from "./Tools/Filter";
import EditableCell from "./Tools/EditableCell";
import { expandColumn, selectColumn } from "./Tools/TableUtils"
import { inFilterArray } from './Tools/FilterFns'

export default ({
    columns,
    data,
    id = 'id',
    canSort = false,
    canFilter = false,
    canSelect = false,
    canExpand = false,
    paginated = false,
    selectedRowsIds = undefined,
    customRowProps = () => { },
    sortBy = [],
    renderSubComponent = () => { },
    onRowClick = () => { },
    rowStyle = () => { },
    onSelectRow = () => { },
    onCellEdit = () => { },
}) => {

    const [sorting, setSorting] = useState(sortBy);
    const [rowSelection, setRowSelection] = useState({})
    const [columnFilters, setColumnFilters] = useState([])
    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

    useEffect(() => {
        onSelectRow(Object.keys(rowSelection))
    }, [Object.keys(rowSelection).length])

    const hiddenStateFromProps = useMemo(() => {
        const visibleColumns = {};
        columns.forEach(column => {
            visibleColumns[column.id ?? column.accessorKey ?? column.header] = !(column?.enableHiding);
        });

        return visibleColumns
    }, [])

    const getColumns = () => {
        let newColumns = columns
        if (canSelect) newColumns.unshift(selectColumn)
        if (canExpand) newColumns.unshift(expandColumn)
        return newColumns

    }

    const selectedStateFromProps = useMemo(() => {
        let state = {}
        selectedRowsIds?.forEach(id => {
            state[id] = true
        });
        return state
    }, [JSON.stringify(selectedRowsIds)])


    const table = useReactTable({
        data,
        getRowId: (originalRow, index, parent) => originalRow?.[id] ?? index,
        columns: getColumns(),
        defaultColumn: {
            cell: EditableCell
        },
        enableRowSelection: true,
        state: {
            rowSelection: selectedRowsIds ? selectedStateFromProps : rowSelection,
            columnFilters,
            sorting
        },
        initialState: {
            columnVisibility: hiddenStateFromProps
        },
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        enableHiding: true,
        filterFns: {
            inFilterArray
        },
        enableFilters: canFilter,
        enableExpanding: canExpand,
        manualPagination: !paginated,
        //getRowCanExpand : () => canExpand,
        enableSorting: canSort,
        enableSortingRemoval: true,
        enableMultiSort: true,
        maxMultiSortColCount: 3,
        isMultiSortEvent: () => true,
        meta: {
            updateData: (rowIndex, columnId, value) => {
                // Skip age index reset until after next rerender
                skipAutoResetPageIndex()
                onCellEdit(rowIndex, columnId, value)
            },
        },
        debugTable: true,
    });


    return (
        <>
            <table className="table table-striped">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        :
                                        <> <div

                                            {...{
                                                className: header.column.getCanSort()
                                                    ? header.column.columnDef.headerClassName + ' cursor-pointer select-none'
                                                    : header.column.columnDef.headerClassName,
                                                onClick: header.column.getToggleSortingHandler(),
                                            }}
                                        >

                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                            {{
                                                asc: ' 🔼',
                                                desc: ' 🔽',
                                            }[header.column.getIsSorted()] ?? null}
                                        </div>
                                            {header.column.getCanFilter() ? (
                                                <div>
                                                    <Filter column={header.column} columnDef={header.column.columnDef} table={table} />
                                                </div>
                                            ) : null}
                                        </>}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map(row => {
                        return (
                            <>
                                <tr key={row.id} {...customRowProps(row)} onClick={() => {
                                    row.toggleExpanded();
                                    onRowClick(row.id)
                                }} style={rowStyle(row.id)
                                }>
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    )
                                    )}
                                </tr>
                                {row.getIsExpanded() && renderSubComponent(row) && (
                                    <tr>
                                        <td colSpan={row.getVisibleCells().length}>
                                            {renderSubComponent(row)}
                                        </td>
                                    </tr>
                                )}
                            </>
                        )
                    })}
                </tbody>

            </table>
            {
                paginated && table.getPageCount() > 1 ?
                    <div className="d-flex justify-content-end">
                        <Paginate
                            gotoPage={table.setPageIndex}
                            previousPage={table.previousPage}
                            nextPage={table.nextPage}
                            canPreviousPage={table.getCanPreviousPage()}
                            canNextPage={table.getCanNextPage()}
                            pageIndex={table.getState().pagination.pageIndex}
                            pageCount={table.getPageCount()}
                            pageSize={table.getState().pagination.pageSize}
                            setPageSize={table.setPageSize}
                            rowsCount={table.getPrePaginationRowModel().rows.length}
                        />
                    </div>
                    :
                    null
            }
        </>
    )
}

function useSkipper() {
    const shouldSkipRef = React.useRef(true)
    const shouldSkip = shouldSkipRef.current

    // Wrap a function with this to skip a pagination reset temporarily
    const skip = React.useCallback(() => {
        shouldSkipRef.current = false
    }, [])

    React.useEffect(() => {
        shouldSkipRef.current = true
    })

    return [shouldSkip, skip]
}