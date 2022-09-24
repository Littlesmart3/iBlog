import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Coder",
    Svg: require("@site/static/img/item2.svg").default,
    description: <>Design is a process of finding problems, not solutions.</>,
  },
  {
    title: "Gamer",
    Svg: require("@site/static/img/league_of_legends.svg").default,
    description: <>Never stop playing If not fun, why bother?</>,
  },
  {
    title: "Sporter",
    Svg: require("@site/static/img/sport.svg").default,
    description: (
      <>
        There is nothing more beautiful than strong muscle and fresh skin of his
        cloak.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
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
