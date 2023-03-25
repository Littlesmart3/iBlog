import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useParams } from 'react-router-dom';
import { useDocs } from '@docusaurus/router';
import Layout from '@theme/Layout';

const Iframe: React.FC = () => {
  const a = useParams();
  console.log(123);

  const url = 1;
  const iframeSrc = `https://www.littlesmart3.top/threejs-case/#/${url}`;
  return <iframe src={iframeSrc} width="100%" height="100%" />;
};

const ThreejsCase: React.FC = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Switch>
          <Route path="/project/threejs-case/:id" component={Iframe} />
        </Switch>
      </BrowserRouter>
    </Layout>
  );
};

export default ThreejsCase;
