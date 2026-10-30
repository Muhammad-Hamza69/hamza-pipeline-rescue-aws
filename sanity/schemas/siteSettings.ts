import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Full Name' }),
    defineField({ name: 'shortName', type: 'string', title: 'Short Name (navbar)' }),
    defineField({ name: 'role', type: 'string', title: 'Job Title' }),
    defineField({ name: 'tagline', type: 'string', title: 'Hero Headline' }),
    defineField({ name: 'subTagline', type: 'string', title: 'Hero Sub-copy' }),
    defineField({ name: 'availability', type: 'string', title: 'Availability Badge Text' }),
    defineField({ name: 'email', type: 'string', title: 'Email Address' }),
    defineField({ name: 'github', type: 'url', title: 'GitHub URL' }),
    defineField({ name: 'linkedin', type: 'url', title: 'LinkedIn URL' }),
    defineField({ name: 'location', type: 'string', title: 'Location' }),
    defineField({
      name: 'resume',
      type: 'file',
      title: 'Resume (PDF)',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'stats',
      type: 'array',
      title: 'Hero Stats',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', type: 'number', title: 'Number' },
          { name: 'suffix', type: 'string', title: 'Suffix (e.g. + or %)' },
          { name: 'label', type: 'string', title: 'Label' },
        ],
      }],
    }),
  ],
})
