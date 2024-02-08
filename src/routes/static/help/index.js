import React from 'react';
import Layout from '../../../components/Layout';
import Page from '../../../components/Page';
import fetch from '../../../core/fetch';
import { fetchData } from '../fetchData';


export default async function action({ locale }) {
  const dataResult = await new Promise((resolve) => {
    require.ensure([], (require) => {
      resolve(require('./help.md'));
    }, 'help');
  });
  const data = await fetchData({ id: 5, locale });

  if (data) {

    return {
      title: data.title,
      description: data.description,
      chunk: 'help',
      component: <Layout><Page html={data.html} title={data.title} /></Layout>,
    };

  } else {

    return {
      title: dataResult.title,
      chunk: 'help',
      component: <Layout><Page {...dataResult} /></Layout>,
    };

  }
};
