/**
 * gatsby-config.js
 */
module.exports = {
  siteMetadata: {
    title: 'Pooja Patel — Applied ML Systems Researcher',
    description:
      'Portfolio of Pooja Patel — Computer Science undergraduate specialising in distributed ML systems, AI-native security tools, and self-healing code architectures.',
    author: 'Pooja Patel',
    siteUrl: 'https://poojapatel.dev',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Pooja Patel Portfolio',
        short_name: 'PP Portfolio',
        start_url: '/',
        background_color: '#fafafa',
        theme_color: '#1e293b',
        display: 'standalone',
        icon: 'src/images/favicon.png', // create a 512×512 PNG here
      },
    },
  ],
};
