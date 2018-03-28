Basic Switcher:

```js
initialState = { value: true };

<Switcher
  id="switcher_example"
  name="switcher_example"
  value={state.value}
  onChange={value => setState({ value })}
/>;
```

Switcher with label:

```js
initialState = { value: true };

<Switcher
  id="switcher_label"
  name="switcher_label"
  value={state.value}
  onChange={value => setState({ value })}
  label="Switcher with label"
/>;
```

Switcher with description:

```js
initialState = { value: true };

<Switcher
  id="switcher_description"
  name="switcher_description"
  value={state.value}
  onChange={value => setState({ value })}
  label="Switcher label"
  description="Some description about what this switcher change"
/>;
```

Switcher with hint:

```js
initialState = { value: true };

<Switcher
  id="switcher_hint"
  name="switcher_hint"
  value={state.value}
  onChange={value => setState({ value })}
  label="Switcher label"
  hint="Some text about what this switcher do"
/>;
```

Disabled Switcher:

```js
initialState = { value: true };

<Switcher
  disabled
  id="switcher_disabled"
  name="switcher_disabled"
  value={state.value}
  onChange={value => setState({ value })}
/>;
```

Danger Switcher:

```js
initialState = { value: true };

<Switcher
  danger
  id="switcher_danger"
  name="switcher_danger"
  value={state.value}
  onChange={value => setState({ value })}
/>;
```
