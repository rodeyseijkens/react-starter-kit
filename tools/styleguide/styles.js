const color = {
  primary: '#404040',
  danger: '#e22d44',
  info: '#989898',
};

module.exports = {
  theme: {
    maxWidth: '100%',
    sidebarWidth: 250,
    fontFamily: {
      base: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
      ],
      monospace: [
        'SF Mono',
        'Monaco',
        'Inconsolata',
        'Fira Code',
        'Fira Mono',
        'Droid Sans Mono',
        'Consolas',
        'Roboto Mono',
        'Source Code Pro',
        'monospace',
      ],
    },
    color: {
      link: color.info,
      linkHover: 'rgb(50, 50, 50)',
      sidebarBackground: color.primary,
      errorBackground: color.danger,
    },
  },
  styles: {
    StyleGuide: {
      root: {
        'text-rendering': 'optimizeLegibility',
        '-moz-osx-font-smoothing': 'grayscale',
        '-webkit-font-smoothing': 'antialiased',
      },
      sidebar: {
        '&::-webkit-scrollbar': {
          width: 10,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: color.primary,
        },
        '&::-webkit-scrollbar-thumb': {
          border: `3px solid ${color.primary}`,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          backgroundColor: '#fff',
          minHeight: 40,
          '&:active': {
            borderLeftWidth: 2,
            borderRightWidth: 2,
          },
        },
      },
      content: {},
      logo: {
        border: 'none',
        paddingBottom: 0,
      },
    },
    SectionHeading: {
      heading: {
        textDecoration: 'none',
        '&::after': {
          content: '"#"',
          display: 'none',
          marginLeft: 6,
          color: 'rgba(0, 0, 0, 0.3)',
          fontWeight: '600',
        },
        '&:hover': {
          textDecoration: 'none',
        },
        '&:hover::after': {
          display: 'inline-block',
        },
      },
    },
    Logo: {
      logo: {
        color: '#fff',
        fontSize: 20,
      },
    },
    ComponentsList: {
      list: {
        '& ul': {
          paddingLeft: 0,
        },
      },
      item: {
        fontSize: '14px !important',
        '& a': {
          cursor: 'pointer !important',
          color: 'rgba(255, 255, 255, 0.9) !important',
          fontWeight: 500,
          '&:hover': {
            textDecoration: 'underline',
            color: '#fff !important',
          },
        },
      },
      heading: {
        fontSize: '18px !important',
        fontWeight: '600 !important',
        color: '#fff !important',
      },
    },
    TableOfContents: {
      input: {
        borderColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: '4px',
        padding: '6px 8px',
        lineHeight: '24px',
        color: '#fff',
        boxSizing: 'border-box',
        backgroundColor: 'transparent',
      },
    },
    Pathline: {
      copyButton: {
        border: 0,
      },
    },
    Playground: {
      preview: {
        padding: 0,
      },
    },
    PlaygroundError: {
      root: {
        margin: 0,
      },
    },
  },
};
