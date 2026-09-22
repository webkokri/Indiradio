export default {
  name: 'contactSubmission',
  title: 'Contact Submission',
  type: 'document',
  // Created by the backend API (server/api/contact.js) using a write token —
  // not meant to be authored manually in the Studio.
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'subject', title: 'Subject', type: 'string' },
    { name: 'message', title: 'Message', type: 'text', rows: 4 },
    { name: 'submittedAt', title: 'Submitted At', type: 'datetime' },
  ],
  preview: {
    select: { title: 'name', subtitle: 'email' },
  },
}
