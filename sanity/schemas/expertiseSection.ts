import { defineType, defineField } from 'sanity'

const expertiseColumn = {
  type: 'object',
  fields: [
    { name: 'title', type: 'string', title: 'Column Title' },
    { name: 'description', type: 'text', title: 'Description', rows: 2 },
    {
      name: 'skills',
      type: 'array',
      title: 'Skills List',
      of: [{ type: 'string' }],
    },
  ],
}

export const expertiseSection = defineType({
  name: 'expertiseSection',
  type: 'document',
  title: 'Expertise Section',
  fields: [
    defineField({ name: 'dataEngineering', type: 'object', title: 'Data Engineering Column', fields: expertiseColumn.fields }),
    defineField({ name: 'cloudAI', type: 'object', title: 'AI & Cloud Column', fields: expertiseColumn.fields }),
    defineField({
      name: 'techStack',
      type: 'array',
      title: 'Tech Stack Chips',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string', title: 'Technology Name' },
          { name: 'category', type: 'string', title: 'Category' },
        ],
      }],
    }),
  ],
})
