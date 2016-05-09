# babel-plugin-import-auto-name

A [babel](http://babeljs.io) plugin to automatically expand nameless imports.

## Description

Instead of redudantly importing the same name as the file, you’ll be able to just import the file.

Here’s a simple example:

```js
// Instead of using this:
import {thing} from 'some/thing';

// You can just use:
import 'some/thing';
```

## Conditions

The plugin has a few conditions requires to auto-expand the name:

1. The `import` command can not specify any names (duh)
2. A forward slash is required (as not to intefere with regular modules)
3. No file extension can be specified
