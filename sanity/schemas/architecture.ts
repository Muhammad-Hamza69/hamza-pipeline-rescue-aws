import { defineType, defineField } from 'sanity'

export const architecture = defineType({
  name: 'architecture',
  type: 'document',
  title: 'Architecture Diagrams',
  fields: [
    defineField({ name: 'order', type: 'number', title: 'Display Order' }),
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'subtitle', type: 'string', title: 'Subtitle (tech flow)' }),
    defineField({ name: 'description', type: 'text', title: 'Description', rows: 2 }),
    defineField({
      name: 'imageUrl',
      type: 'url',
      title: 'Diagram Image URL',
      description: 'Link to a hosted diagram image (e.g. raw GitHub URL). Takes priority over ASCII diagram.',
    }),
    defineField({
      name: 'diagram',
      type: 'text',
      title: 'ASCII Diagram (fallback)',
      rows: 30,
      description: 'Used only when no image URL is set. Whitespace is preserved exactly.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle' },
  },
})
