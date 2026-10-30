import { defineType, defineField } from 'sanity'

export const certification = defineType({
  name: 'certification',
  type: 'document',
  title: 'Certifications',
  fields: [
    defineField({ name: 'order', type: 'number', title: 'Display Order' }),
    defineField({ name: 'name', type: 'string', title: 'Certification Name' }),
    defineField({ name: 'issuer', type: 'string', title: 'Issuing Organization' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'issuer' },
  },
})
