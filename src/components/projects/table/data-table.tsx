'use client'

/** libs */
import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

/** components */
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { FilterTabs } from './filter-tabs'
import { CirclePlus } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ActionsDropdown } from '@/components/projects/table/actions-dropdown'

/** types */
import type { ProjectItemType } from '@/types/projects'

type DataTableProps = {
  data: ProjectItemType[]
}

const DataTable = ({ data }: DataTableProps) => {
  const [filterStatus, setFilterStatus] = useState<string>('all')

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
        <Link href="/projects/create" className={buttonVariants({ size: 'sm' })}>
          <CirclePlus className="mr-2 h-4 w-4" />
          New Project
        </Link>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex max-h-full flex-col gap-y-5">
          <div className="relative max-h-full w-full flex-1 overflow-auto rounded-md border">
            <Table className="w-full min-w-[1024px] overflow-x-auto">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[96px]" />
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Create Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="sticky right-0 w-[64px] border-l border-border" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length > 0 ? (
                  <>
                    {data.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="relative h-16 w-16">
                            <Image
                              src={item.coverImage}
                              fill
                              sizes="64px"
                              alt={item.title}
                              className="rounded-md object-cover object-center"
                            />
                          </div>
                        </TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.createDate}</TableCell>
                        <TableCell>
                          <Badge variant={item.status === 'draft' ? 'secondary' : 'default'} className="capitalize">
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="sticky right-0 w-[64px] border-l border-border">
                          <ActionsDropdown itemID={item.id} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No Projects.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

export { DataTable }
