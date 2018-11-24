# jest-generator

[![Build Status](https://travis-ci.com/doniyor2109/jest-generator.svg?branch=master)](https://travis-ci.com/doniyor2109/jest-generator)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/doniyor2109/jest-generator/blob/master/LICENSE)

Testing generators are verbose as they require calling `next` method of generator each time you want to iterate. `jest-generator` encapsulates all iteration and assertion logic itself. It provides easy and readable API for testing generator functions.


# Installation

```bash

yarn add --dev jest-generator

```

or

```bash

npm install --save-dev jest-generator

```

# Setup

#### Via `setupTestFrameworkScriptFile` config

Add `jest-generator` to your Jest `setupTestFrameworkScriptFile` configuration

```json
"jest": {
  "setupTestFrameworkScriptFile": "jest-generator"
}
```

#### Via `setupTest` script

Require `jest-generator` from setupTest script

```js
// ./setupTest.js

require('jest-generator');
```

Then add this config

```json
"jest": {
  "setupTestFrameworkScriptFile": "./setupTest.js"
}
```

# Usage

```js
// ./generator.js

export function* pay() {
  yield validatePayment();
  yield makePayment();

  return finishPayment();
}
```

```js
// ./generator.test.js

import { number } from './generator';

test('should work correctly', () => {
  const iterator = numbers();

  expect(iterator).toMatchYields([
    [validatePayment()],
    [makePayment()],
    [finishPayment()]
  ]);
});

```

# Usage with other libraries

## Usage with Saga

 
```js
// ./books.js

export function* loadBooks(params) {
  try {
    const response = yield call(api.loadBooks, params)
    
    yield put(booksLoadedSuccess(response))
  } catch (error) {
    yield put(booksLoadFail(error.message))
  }
}
```

```js
// ./books.test.js

import { loadBooks } from './books';

test('should handle success response', () => {
  const params = { id: 201 };
  const iterator = loadBooks(params);
  const response = [];

  expect(iterator).toMatchYields([
    [call(api.loadBooks, params), response],
    [booksLoadedSuccess(response)],
  ]);
});

test('should handle error response', () => {
  const params = { id: 201 };
  const iterator = loadBooks(params);
  const response = new Error('failed to load books');

  expect(iterator).toMatchYields([
    [call(api.loadBooks, params), response],
    [put(booksLoadFail(response.message))],
  ]);
});

```

# API

```js
.toMatchYields(
  yieldValues: [
    [yieldValue: any, returnType?: any | Error]
  ]
)
```

Matches iterator against given yield values

```js
expect(itetaor).toMatchYields([
  [callAPI()]
])
```

In order to return value from yield, simply pass your return value as second array value

```js
function* gen() {
  const response = yield fetch()
  yield update(response)
}

const mockResponse = {};
const iterator = gen();

expect(iterator).toMatchYields([
  [fetch(), mockResponse],
  [update(mockResponse)]
])
```

In order to throw error from yield, you should simply pass `Error` instance to return type

```js
function* gen() {
  const response = yield fetch()
  yield update(response)
}

const mockErrorResponse = new Error('network error');
const iterator = gen();

expect(iterator).toMatchYields([
  [fetch(), mockErrorResponse],
  [handleError(mockErrorResponse)]
])
```
 
