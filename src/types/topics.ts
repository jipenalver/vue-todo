export type Topic = {
  name: string
  guid: string
  comments: Comment[]
}

export type Comment = {
  comment: string
  date: string
  by: string
}

export type Person = {
  first: string
  last: string
  guid: string
  email: string
}
