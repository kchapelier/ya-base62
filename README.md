# Yet Another Base62

[![Build Status](https://travis-ci.org/kchapelier/ya-base62.svg)](https://travis-ci.org/kchapelier/ya-base62) [![NPM version](https://badge.fury.io/js/ya-base62.svg)](http://badge.fury.io/js/ya-base62)

## Installing and testing

With [npm](http://npmjs.org) do:

```
npm install ya-base62
```

To run the test suite, run the following command from the ```ya-base62``` directory:

```
npm test
```

## Features

 * First and foremost designed to encode/decode multiple values to/from a structured string.
 * Comparatively fast decoding.
 * The library doesn't support big numbers (integers encoded on more than 51 bits, > Number.MAX_SAFE_INTEGER).
 * The library doesn't support custom charsets (it is hardcoded to
`0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ` which is the default charset of most existing
implementations).

## Usage

### Encoding a structured string

```js
var yabe62 = require('ya-base62');

var width = 600,
    height = 480,
    value = 12093;

var structuredString = (
    yabe62.mbValueToBase62(width, 2) +
    yabe62.mbValueToBase62(height, 2) +
    yabe62.mbValueToBase62(value, 8)
); // '9G7K00000393'
```

### Decoding a structured string

```js
var yabe62 = require('ya-base62');

var structuredString = '9G7K00000393';

console.log(
    yabe62.mbValueFromBase62(structuredString, 0, 2),
    yabe62.mbValueFromBase62(structuredString, 2, 2),
    yabe62.mbValueFromBase62(structuredString, 4, 8)
); // 600 480 12093
```

### Decoding and encoding unstructured string

```js
var yabe62 = require('ya-base62');

console.log(yabe62.encode(1200050000)); // '1jdhPa'
console.log(yabe62.decode('1jdhPa')); // 1200050000
```

## Public API

The module is exposing 6 pure functions.

**sbValueToBase62(value)**

Convert an integer value to a single byte base 62 value.

 * *value :* An integer in the [0-61] range.

**sbValueFromBase62(string, position)**

Convert a single byte base 62 value to an integer.

 * *string :* String containing the single byte base 62 value.
 * *position :* Position of the character to decode.

**mbValueToBase62(value, length)**

Convert an integer value to a multiple byte base 62 value.

 * *value :* An integer in the [0-(62 ** length - 1)] range.
 * *length :* The number of bytes.

**mbValueFromBase62(string, position, length)**

Convert a multiple byte base 62 value to an integer.

 * *string :* String containing the multiple byte base 62 value.
 * *position :* Start position of the characters to decode.
 * *length :* Number of bytes to decode.

**encode(value)**

Convert an integer to a base 62 value.

 * *value :* Positive integer to encode.

**decode(string)**

Convert the entirety of a given base 62 string to an integer.

 * *string :* String containing the base 62 value to decode.

## Benchmark

It should be noted that this benchmark is slightly unfair. The slowness of the other module when encoding can be
explained by the fact that they allow the use of custom charset.

| Operation  | Module | Results | Time elapsed |
| ---------- | ------ | ------- | ------------ |
| decoding (1000000x) | ya-base62@1.0.0 | correct | 97.88 ms |
| decoding (1000000x) | base62@1.1.2 | correct | 2149.35 ms |
| decoding (1000000x) | base62.js@0.5.0 | correct | 909.97 ms |
| encoding (1000000x) | ya-base62@1.0.0 | correct | 63.78 ms |
| encoding (1000000x) | base62@1.1.2 | correct | 57.27 ms |
| encoding (1000000x) | base62js@0.5.0 | correct | 86.71 ms |
| mbValueToBase62 on 10 characters (1000000x) | ya-base62@1.0.0 | correct | 180.27 ms |

[Benchmark code](https://github.com/kchapelier/ya-base62/blob/master/benchmark/benchmarks.js)

## Changelog

### 1.0.0 (2017.05.14) :

 * First implementation

## License

MIT
