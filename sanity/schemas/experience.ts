import { defineType, defineField } from 'sanity'

export const experience = defineType({
  name: 'experience',
  type: 'document',
  title: 'Work Experience',
  fields: [
    defineField({ name: 'order', type: 'number', title: 'Display Order (1 = most recent)' }),
    defineField({ name: 'company', type: 'string', title: 'Company Name' }),
    defineField({ name: 'role', type: 'string', title: 'Job Title' }),
    defineField({ name: 'period', type: 'string', title: 'Period (e.g. Jan 2026 – May 2026)' }),
    defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
    defineField({ name: 'tags', type: 'array', title: 'Skill Tags', of: [{ type: 'string' }] }),
  ],
  preview: {
    select: { title: 'company', subtitle: 'role' },
  },
})
