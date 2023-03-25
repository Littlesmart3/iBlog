import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';

import styles from './styles.module.css';

const Header: React.FC = () => {
  const githubUrl = 'https://github.com/Littlesmart3';
  return (
    <div className={clsx(styles.header)}>
      <h1>项目展示</h1>
      <a
        className="button button--primary"
        href={githubUrl}
        target="_blank"
        rel="noreferrer"
      >
        <div id="showcase.header.button">🥰 前往 Github 克隆项目</div>
      </a>
    </div>
  );
};

const Main: React.FC = () => {
  return <div>123</div>;
};

function Project(): JSX.Element {
  return (
    <Layout>
      <main>
        <Header />
        <Main />
      </main>
    </Layout>
  );
}

export default Project;
