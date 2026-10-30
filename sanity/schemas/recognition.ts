import { defineType, defineField } from 'sanity'

export const recognition = defineType({
  name: 'recognition',
  type: 'document',
  title: 'Recognition & Awards',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
