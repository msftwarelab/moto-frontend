import React from 'react';
import Layout from '../../../components/Layout';
import Page from '../../../components/Page';
import { fetchData } from '../fetchData';


export default async function action({ locale }) {
  const dataResult = await new Promise((resolve) => {
    require.ensure([], (require) => {
      try {
        resolve(require(`./policies.${locale}.md`)); // eslint-disable-line import/no-dynamic-require
      } catch (e) {
        resolve(require('./policies.md'));
      }
    }, 'policies');
  });

  const data = await fetchData({ id: 6, locale });


  if (data) {
    return {
      title: data.title,
      description: data.description,
      chunk: 'about',
      component: <Layout><Page html={data.html} title={data.title} /></Layout>,
    };

  } else {
    return {
      title: dataResult.title,
      chunk: 'privacy',
      component: <Layout><Page {...dataResult} /></Layout>,
    };
  }
};
