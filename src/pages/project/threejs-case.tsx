import React, { useEffect } from 'react';
import { useLocation, useHistory } from '@docusaurus/router';
import Layout from '@theme/Layout';

const ThreejsCase: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  const queryParams = new URLSearchParams(location.search);
  const projectKey = queryParams.get('id');
  const iframeUrl = `https://www.littlesmart3.top/threejs-case/#/${projectKey}`;
  useEffect(() => {
    if (!projectKey) history.push('/404');
  }, []);
  return (
    <Layout>
      <iframe src={iframeUrl} style={{ height: '100%' }} />
    </Layout>
  );
};

export default ThreejsCase;
