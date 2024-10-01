'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'
import type { ProjectItemType } from '@/types/projects'

export const columns: ColumnDef<ProjectItemType>[] = [
  {
    id: 'thumbnail-image',
    accessorKey: 'thumbnailImage',
    header: '',
    meta: {
      className: 'w-[96px]',
    },
    cell: ({ row }) => {
      return (
        <div className="relative h-16 w-16">
          <Image
            src={row.original.thumbnailImage}
            fill
            alt={row.original.title}
            className="rounded-md object-cover object-center"
          />
        </div>
      )
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'createDate',
    header: 'Create Date',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.status === 'draft' ? 'secondary' : 'default'} className="capitalize">
          {row.original.status}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    meta: {
      className: 'w-[100px]',
    },
    cell: ({ row }) => {
      const handleDelete = () => {
        toast.success('This item has been deleted.')
      }

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/projects/${row.original.id}`}>View Detail</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="text-muted-foreground" onSelect={(e) => e.preventDefault()}>
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      {`This action cannot be undone.\nThis will permanently delete your task.`}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Confirm</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
