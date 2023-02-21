import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Coder',
    Svg: require('@site/static/img/item2.svg').default,
    description: <>设计是发现问题的过程，而不是解决方案。</>,
  },
  {
    title: 'Gamer',
    Svg: require('@site/static/img/league_of_legends.svg').default,
    description: (
      <>
        没关系的，大家都会做错选择，会莫名其妙掉眼泪，但这并不影响我打游戏，来不来
      </>
    ),
  },
  {
    title: 'Camera',
    Svg: require('@site/static/img/camera.svg').default,
    description: (
      <>
        想拍就拍，想照就照，再好的相机和科技，10年后也恢复不了当下的场景和互动的情绪。
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
