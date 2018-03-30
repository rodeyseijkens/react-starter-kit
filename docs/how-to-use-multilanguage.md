1.  Adjust `locales` settings in `src/config.js static`:

    ```js static
    // default locale is the first one
    module.exports = {
      locales: ['nl-NL', 'en-US'],
    };
    ```

    Note that you should follow
    [BCP 47](https://tools.ietf.org/html/bcp47)
    ([RFC 5646](https://tools.ietf.org/html/rfc5646)).

2.  Add locale support in `src/client.js static`:

    ```js static
    import nl from 'react-intl/locale-data/nl';
    import en from 'react-intl/locale-data/en';
    ...

    [nl, en].forEach(addLocaleData);
    ```

3.  Messages are fetched server-side and request the `/translations` endpoint with the active locale,
    the response is set in context and context is used to populate the message prop in the
    `<IntlProvider/>` component in `App.js static`

### How to write localizable components

Just import the appropriate [component](https://github.com/yahoo/react-intl/wiki#the-react-intl-module) from `react-intl`

* For localizable text use
  [`<FormattedMessage>`](https://github.com/yahoo/react-intl/wiki/Components#formattedmessage).

* For date and time:
  [`<FormattedDate>`](https://github.com/yahoo/react-intl/wiki/Components#formatteddate)
  [`<FormattedTime>`](https://github.com/yahoo/react-intl/wiki/Components#formattedtime)
  [`<FormattedRelative>`](https://github.com/yahoo/react-intl/wiki/Components#formattedrelative)

* For numbers and currencies:
  [`<FormattedNumber>`](https://github.com/yahoo/react-intl/wiki/Components#formattednumber)
  [`<FormattedPlural>`](https://github.com/yahoo/react-intl/wiki/Components#formattedplural)

* If possible, do not use `<FormattedHTMLMessage>`, see how to use _Rich Text Formatting_ with
  [`<FormattedMessage>`](https://github.com/yahoo/react-intl/wiki/Components#formattedmessage)

* When you need an imperative formatting API, use the [`injectIntl`](https://github.com/yahoo/react-intl/wiki/API#injectintl) High-Order Component.

#### Example

```js static
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  FormattedDate,
  FormattedNumber,
  FormattedMessage,
  FormattedPlural,
  FormattedRelative,
  FormattedTime,
} from 'react-intl';

import s from './Home.css';

@withStyles(s)
class Home extends React.Component {
  render() {
    const date = Date.now();

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>React.js static News</h1>
          <FormattedDate value={date} />
          <br />
          <FormattedTime value={date} />
          <br />
          <FormattedRelative value={date} />
          <br />
          <FormattedNumber
            {...{
              style: 'currency',
              currency: 'EUR',
              value: 1000,
            }}
          />
          <br />
          <FormattedNumber
            {...{
              style: 'percent',
              value: 0.82,
            }}
          />
          <br />
          <FormattedNumber value="10" /> <FormattedPlural
            value={10}
            one="message"
            other="messages"
          />
          <br />
          <FormattedMessage
            id="app.greeting"
            description="Greeting to welcome the user to the app"
            defaultMessage="Hello, {name}!"
            values={{
              name: <b>Some Name</b>,
            }}
          />
        </div>
      </div>
    );
  }
}

export default Home;
```

### Other References

* [`Intl documentation on MDN`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl)
* [express-request-language](https://github.com/tinganho/express-request-language#readme)
  – for more details how initial language negotiation works.
