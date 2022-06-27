/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  tutorialSidebar: [
    {
      type: 'doc',
      label: 'Introduction',
      id: 'intro'
    },
    
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'gettingStarted/installation',
        'gettingStarted/usage',
      ]
    },
    {
      type: 'category',
      label: 'Hooks',
      items: [
        'hooks/useArray',
        // 'hooks/useCountdown',
        'hooks/useInput',
        'hooks/useAsync',
        'hooks/useClamp',
        'hooks/useClickOutside',
        'hooks/useDebounceEffect',
        // 'hooks/useDebounce',
      ],
    },
    // {
    //   type: 'category',
    //   label: 'Examples',
    //   items: [
    //     'examples/form',
    //   ],
    // },
    {
      type: 'doc',
      label: 'Contributing',
      id: 'contributing'
    },
    {
      type: 'doc',
      label: 'Style Guide',
      id: 'style-guide'
    },
  ],
};

module.exports = sidebars;
