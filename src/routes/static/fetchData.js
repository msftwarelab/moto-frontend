
import fetch from '../../core/fetch';

const query = `query getEditStaticPage (
  $id: Int!,
  $translationIdContentLabel: String,
  $translationIdMetaTitleLabel: String,
  $translationIdMetaDescriptionLabel: String

) {
  getEditStaticPage (id: $id) {
      id
      pageName
      content
      metaTitle
      metaDescription
      createdAt
  }
  getTranslationContentLabel: getTranslation(id: $translationIdContentLabel) {
    id
    value
  }
  getTranslationMetaTitleLabel: getTranslation(id: $translationIdMetaTitleLabel) {
    id
    value
  }
  getTranslationMetaDescriptionLabel: getTranslation(id: $translationIdMetaDescriptionLabel) {
    id
    value
  }
}`;


export async function fetchData({ locale, id }) {
  
  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: {
        id,
        translationIdContentLabel: `static.contentLabel.${id}.${locale}`,
        translationIdMetaTitleLabel: `static.metaTitleLabel.${id}.${locale}`,
        translationIdMetaDescriptionLabel: `static.metaDescriptionLabel.${id}.${locale}`
      },
    }),
    credentials: 'include',
  });
  const { data } = await resp.json();

  const title = data.getTranslationMetaTitleLabel?.value || data.getEditStaticPage.metaTitle;
  const description = data.getTranslationMetaDescriptionLabel?.value || data.getEditStaticPage.metaDescription;
  const html = data.getTranslationContentLabel?.value || data.getEditStaticPage.content;

  if (title === undefined || description === undefined || html === undefined) {
    return undefined;
  }
  return { title, description, html };
}