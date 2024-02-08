import React from 'react';
import Layout from '../../../components/Layout';
import Page from '../../../components/Page';
import { fetchData } from '../fetchData';

export default async function action({ locale }) {
  const dataResult = await new Promise((resolve) => {
    require.ensure([], (require) => {
      try {
        resolve(require(`./privacy.${locale}.md`)); // eslint-disable-line import/no-dynamic-require
      } catch (e) {
        resolve(require('./privacy.md'));
      }
    }, 'privacy');
  });

  const data = await fetchData({ id: 4, locale });

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
