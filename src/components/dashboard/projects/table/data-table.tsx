'use client'

/** libs */
import { useState } from 'react'
import { cn } from '@/lib/utils/cn'
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'

/** components */
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { FilterTabs } from './filter-tabs'
import { CirclePlus } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const DataTable = <TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) => {
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [pagination, setPagination] = useState({
    pageIndex: 0, // initial page index
    pageSize: 20, // default page size
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      //...
      pagination,
    },
  })

  return (
    <>
      <div className="flex items-center justify-between">
        <FilterTabs
          options={[
            {
              label: 'All',
              value: 'all',
            },
            {
              label: 'Draft',
              value: 'draft',
            },
            {
              label: 'Published',
              value: 'published',
            },
          ]}
          value={filterStatus}
          onValueChange={setFilterStatus}
        />
        <Link href="/dashboard/projects/create" className={buttonVariants({ size: 'sm' })}>
          <CirclePlus className="mr-2 h-4 w-4" />
          New Project
        </Link>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex max-h-full flex-col gap-y-5">
          <div className="relative max-h-full w-full flex-1 overflow-auto rounded-md border">
            <Table className="w-full min-w-[1024px] overflow-x-auto">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className={cn(header.column.columnDef.meta?.className)}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    const cells = row.getVisibleCells()
                    return (
                      <TableRow key={row.id}>
                        {cells.map((cell) => (
                          <TableCell key={cell.id} className={cn(cell.column.columnDef.meta?.className)}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No Projects.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  )
}

export { DataTable }
