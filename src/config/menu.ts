export const NAVBAR = {
  title: "Littlesmart3 Blog",
  logo: {
    alt: "My Site Logo",
    src: "img/logo.svg",
  },
  items: [
    {
      type: "doc",
      docId: "intro",
      position: "left",
      label: "Tutorial",
    },
    { to: "/blog", label: "Blog", position: "left" },
    {
      href: "https://github.com/facebook/docusaurus",
      label: "GitHub",
      position: "right",
    },
  ],
};
