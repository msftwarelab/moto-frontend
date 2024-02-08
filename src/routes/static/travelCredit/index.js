import React from 'react';
import Layout from '../../../components/Layout';
import Page from '../../../components/Page';
import { fetchData } from '../fetchData';



export default async function action() {
  const dataResult = await new Promise((resolve) => {
    require.ensure([], (require) => {
      resolve(require('./travelCredit.md'));
    }, 'travelCredit');
  });


  const data = await fetchData({ id: 3, locale });

  if (data && data.getEditStaticPage) {
    return {
      title: data.title,
      description: data.description,
      chunk: 'about',
      component: <Layout><Page html={data.html} title={data.title} /></Layout>,
    };
  } else {
    return {
      title: dataResult.title,
      chunk: 'travelCredit',
      component: <Layout><Page {...dataResult} /></Layout>,
    };
  }
};
