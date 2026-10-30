import { defineType, defineField } from 'sanity'

export const howIWorkSection = defineType({
  name: 'howIWorkSection',
  type: 'document',
  title: 'How I Work Section',
  fields: [
    defineField({
      name: 'steps',
      type: 'array',
      title: 'Steps',
      of: [{
        type: 'object',
        fields: [
          { name: 'step', type: 'string', title: 'Step Number (e.g. 01)' },
          { name: 'title', type: 'string', title: 'Step Title' },
          { name: 'description', type: 'text', title: 'Description', rows: 3 },
        ],
      }],
    }),
  ],
})
