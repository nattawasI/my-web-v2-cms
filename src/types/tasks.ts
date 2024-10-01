export type TaskStatusType = {
  value: string
  label: string
}

export type TaskItemType = {
  id: string
  title: string
  description: string
  tag: string
  dueDate: string
  status: TaskStatusType['value']
}
