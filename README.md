# jest-generator

# Installation

```bash

yarn add --dev jest-generator

```

or

```bash

npm install --save-dev jest-generator

```

# Setup

Add `jest-generator` to your Jest `setupTestFrameworkScriptFile` configuration

```json
"jest": {
  "setupTestFrameworkScriptFile": "jest-extended"
}
```

or

Require `jest-generator` from setupTest script

```js
// ./setuptTest.js

require('jest-extended');
```

Then add this config

```json
"jest": {
  "setupTestFrameworkScriptFile": "./testSetup.js"
}
```

# Usage

```js
// ./generator.js

export function* numbers() {
  yield 1;
  yield 2;

  return 3;
}
```

```js
// ./generator.test.js

import { number } from './generator';

test('should work correctly', () => {
  const iterator = numbers();

  expect(iterator).toMatchYields([
    [1],
    [2],
    [3]
  ]);
});

```
