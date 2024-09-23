export type ProjectStatusType = {
  value: string
  label: string
}

export type ProjectItemType = {
  id: string
  title: string
  description: string
  tag: string
  dueDate: string
  status: TaskStatusType['value']
}
