import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {muxInput} from 'sanity-plugin-mux-input'
import {vercelDeployTool} from 'sanity-plugin-vercel-deploy'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {EarthGlobeIcon, DocumentIcon, CaseIcon} from '@sanity/icons'

export default defineConfig({
  name: 'default',
  title: 'Otherness',

  projectId: 'vdwu088q',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .icon(EarthGlobeIcon)
              .child(S.editor().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.listItem()
              .title('Home Page')
              .icon(DocumentIcon)
              .child(S.editor().schemaType('homePage').documentId('homePage')),
            S.listItem()
              .title('What to Expect Page')
              .icon(DocumentIcon)
              .child(S.editor().schemaType('whatToExpectPage').documentId('whatToExpectPage')),
            S.listItem()
              .title('Work We Do Page')
              .icon(DocumentIcon)
              .child(S.editor().schemaType('workPage').documentId('workPage')),
            S.listItem()
              .title('Conversations Page')
              .icon(DocumentIcon)
              .child(S.editor().schemaType('conversationsPage').documentId('conversationsPage')),
            S.listItem()
              .title('Privacy Page')
              .icon(DocumentIcon)
              .child(S.editor().schemaType('privacyPage').documentId('privacyPage')),
            S.divider(),
            S.listItem()
              .title('Projects')
              .icon(CaseIcon)
              .child(
                S.documentList()
                  .title('Projects')
                  .schemaType('project')
                  .filter('_type == "project"'),
              ),
            S.listItem()
              .title('Articles')
              .icon(CaseIcon)
              .child(
                S.documentList()
                  .title('Articles')
                  .schemaType('article')
                  .filter('_type == "article"'),
              ),
            S.divider(),
            orderableDocumentListDeskItem({type: 'project', S, context}),
            orderableDocumentListDeskItem({type: 'article', S, context}),
          ])
      },
    }),
    visionTool(),
    muxInput({mp4_support: 'standard'}),
    vercelDeployTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  parts: [
    {
      name: 'part:@sanity/base/theme/variables-style',
      path: './customEditorStyles.css',
    },
  ],
})
