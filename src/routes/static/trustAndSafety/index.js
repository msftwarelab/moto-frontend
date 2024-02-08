import React from 'react';
import Layout from '../../../components/Layout';
import Page from '../../../components/Page';
import { fetchData } from '../fetchData';

export default async function action({ locale }) {
  const dataResult = await new Promise((resolve) => {
    require.ensure([], (require) => {
      resolve(require('./trustAndSafety.md'));
    }, 'trustAndSafety');
  });

  const { data } = await fetchData({id: 2, locale})

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
      chunk: 'trustAndSafety',
      component: <Layout><Page {...dataResult} /></Layout>,
    };
  }
};
