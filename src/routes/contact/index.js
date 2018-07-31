import React from 'react';

import Layout from '../../components/globals/Layout';
import Contact from '../../components/templates/Contact';

const title = 'Contact Us';

function action() {
  return {
    chunks: ['contact'],
    title,
    component: (
      <Layout>
        <Contact title={title} />
      </Layout>
    ),
  };
}

export default action;
