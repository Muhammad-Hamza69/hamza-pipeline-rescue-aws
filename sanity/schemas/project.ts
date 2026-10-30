import { defineType, defineField } from 'sanity'

export const project = defineType({
  name: 'project',
  type: 'document',
  title: 'Projects',
  fields: [
    defineField({ name: 'order', type: 'number', title: 'Display Order' }),
    defineField({ name: 'title', type: 'string', title: 'Project Title' }),
    defineField({ name: 'metric', type: 'string', title: 'Metric Headline (bold top line)' }),
    defineField({ name: 'metricDetail', type: 'string', title: 'Metric Detail (sub-line)' }),
    defineField({ name: 'description', type: 'text', title: 'Description', rows: 4 }),
    defineField({ name: 'highlight', type: 'string', title: 'Architecture Highlight (e.g. Kinesis → Airflow → Snowflake)' }),
    defineField({ name: 'tags', type: 'array', title: 'Tech Tags', of: [{ type: 'string' }] }),
    defineField({ name: 'github', type: 'url', title: 'GitHub URL' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'metric' },
  },
})
