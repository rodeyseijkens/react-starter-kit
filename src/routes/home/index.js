import React from 'react';

import Layout from '../../components/globals/Layout';
import Home from '../../components/templates/Home';

async function action() {
  return {
    title: 'React Starter Kit',
    chunks: ['home'],
    component: (
      <Layout>
        <Home />
      </Layout>
    ),
  };
}

export default action;
