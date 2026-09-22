const SINGLETONS = [
  { id: 'siteSettings', title: 'Site Settings' },
  { id: 'homePage', title: 'Home Page' },
  { id: 'aboutPage', title: 'About Page' },
  { id: 'radioPage', title: 'Radio Page' },
  { id: 'contactPage', title: 'Contact Page' },
]

const SINGLETON_TYPES = new Set(SINGLETONS.map((s) => s.id))

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETONS.map((s) =>
        S.listItem()
          .title(s.title)
          .id(s.id)
          .child(S.document().schemaType(s.id).documentId(s.id)),
      ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !SINGLETON_TYPES.has(item.getId())),
    ])
