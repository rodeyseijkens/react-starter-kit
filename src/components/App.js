import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';

import StyleContext from 'isomorphic-style-loader/StyleContext';
import ApplicationContext from './ApplicationContext';

const ContextType = {
  fetch: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  query: PropTypes.shape(),
  store: PropTypes.shape(),
  storeSubscription: PropTypes.shape(),
  // Integrate Redux
  // http://redux.js.org/docs/basics/UsageWithReact.html
  ...ReduxProvider.childContextTypes,
};

class App extends PureComponent {
  static propTypes = {
    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    insertCss: PropTypes.func.isRequired,
    context: PropTypes.shape(ContextType).isRequired,
    children: PropTypes.element.isRequired,
  };

  render() {
    const { children, context, insertCss } = this.props;
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    return (
      <StyleContext.Provider value={{ insertCss }}>
        <ApplicationContext.Provider value={{ context }}>
          <ReduxProvider store={context.store}>
            {React.Children.only(children)}
          </ReduxProvider>
        </ApplicationContext.Provider>
      </StyleContext.Provider>
    );
  }
}

export default App;
