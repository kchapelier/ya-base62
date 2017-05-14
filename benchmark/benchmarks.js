"use strict";

var b62 = require('../'),
    base62 = require('base62'),
    base62js = require('base62.js'),
    now = 0,
    i = 0,
    intResult = 0,
    strResult = '';

var b62Version = require('../package.json').version,
    base62Version = require('base62/package.json').version,
    base62jsVersion = require('base62.js/package.json').version;

function performanceNow () {
    var t = process.hrtime();

    return t[0] * 1000 + t[1] / 1000000;
}

// warmup

for (i = 0; i < 100; i++) {
    strResult = b62.decode(b62.encode(i));
    strResult+= base62.decode(base62.encode(i));
    strResult+= base62js.decode(base62js.encode(i));
}

// benchmarking decode

now = performanceNow();

for (intResult = 0, i = 0; i < 1000000; i++) {
    intResult+= b62.decode('00thing');
}

console.log('|', 'decoding (1000000x)', '|', 'ya-base62@' + b62Version, '|', intResult === 432635954000000 ? 'correct' : 'incorrect', '|', (performanceNow() - now).toFixed(2), 'ms', '|');

now = performanceNow();

for (intResult = 0, i = 0; i < 1000000; i++) {
    intResult+= base62.decode('00thing');
}

console.log('|', 'decoding (1000000x)', '|', 'base62@' + base62Version, '|', intResult === 432635954000000 ? 'correct' : 'incorrect', '|', (performanceNow() - now).toFixed(2), 'ms', '|');

now = performanceNow();

for (intResult = 0, i = 0; i < 1000000; i++) {
    intResult+= base62js.decode('00thing');
}

console.log('|', 'decoding (1000000x)', '|', 'base62.js@' + base62jsVersion, '|', intResult === 432635954000000 ? 'correct' : 'incorrect', '|', (performanceNow() - now).toFixed(2), 'ms', '|');

// benchmarking encode

now = performanceNow();

for (i = 0; i < 1000000; i++) {
    strResult = b62.encode(i);
}

console.log('|', 'encoding (1000000x)', '|', 'ya-base62@' + b62Version, '|', strResult === '4c91' ? 'correct' : 'incorrect', '|', (performanceNow() - now).toFixed(2), 'ms', '|');

now = performanceNow();

for (i = 0; i < 1000000; i++) {
    strResult = base62.encode(i);
}

console.log('|', 'encoding (1000000x)', '|', 'base62@' + base62Version, '|', strResult === '4c91' ? 'correct' : 'incorrect', '|', (performanceNow() - now).toFixed(2), 'ms', '|');

now = performanceNow();

for (i = 0; i < 1000000; i++) {
    strResult = base62js.encode(i);
}

console.log('|', 'encoding (1000000x)', '|', 'base62js@' + base62jsVersion, '|', strResult === '4c91' ? 'correct' : 'incorrect', '|', (performanceNow() - now).toFixed(2), 'ms', '|');

// benchmarking mbValueToBase62

now = performanceNow();

for (i = 0; i < 1000000; i++) {
    strResult = b62.mbValueToBase62(i, 10);
}

console.log('|', 'mbValueToBase62 on 10 characters (1000000x)', '|', 'ya-base62@' + b62Version, '|', strResult === '0000004c91' ? 'correct' : 'incorrect', '|', (performanceNow() - now).toFixed(2), 'ms', '|');
