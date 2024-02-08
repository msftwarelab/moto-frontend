import React from 'react';
import Layout from '../../../components/Layout';
import Page from '../../../components/Page';
import { fetchData } from '../fetchData';


export default async function action({ locale }) {
  const dataResult = await new Promise((resolve) => {
    require.ensure([], (require) => {
      try {
        resolve(require(`./about.${locale}.md`)); // eslint-disable-line import/no-dynamic-require
      } catch (e) {
        resolve(require('./about.md'));
      }
    }, 'about');
  });

  const data = await fetchData({ locale, id: 1 });
  
  if (data) {
    return {
      title: data.title,
      description: data.description,
      chunk: 'about',
      component: <Layout>
        <Page
          html={data.html}
          title={data.title}
        />
      </Layout>,
    };
  } else {
    return {
      title: dataResult.title,
      chunk: 'about',
      component: <Layout><Page {...dataResult} /></Layout>,
    };
  }
};
