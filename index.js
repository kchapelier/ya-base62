"use strict";

var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/**
 * Convert an integer value to a single byte base 62 value
 * @param {int} value An integer in the [0-61] range
 * @returns {string} Single byte base 62 encoded value
 */
var sbValueToBase62 = function sbValueToBase62 (value) {
    return chars[value];
};

/**
 * Convert an integer value to a multiple byte base 62 value
 * @param {int} value An integer in the [0-(62 ** length - 1)] range
 * @param {int} length The number of bytes
 * @returns {string} Multiple byte base 62 encoded value
 */
var mbValueToBase62 = function mbValueToBase62 (value, length) {
    var string = '';

    for (var i = 0; i < length; i++) {
        string = chars[value % 62] + string;
        value = Math.floor(value / 62);
    }

    return string;
};

/**
 * Convert a single byte base 62 value to an integer
 * @param {string} string String containing the single byte base 62 value
 * @param {int} position Position of the character to decode
 * @returns {int} Decoded integer
 */
var sbValueFromBase62 = function sbValueFromBase62 (string, position) {
    var value = string.charCodeAt(position);

    if (value < 58) {
        value = value - 48;
    } else if (value < 91) {
        value = value - 29;
    } else {
        value = value - 87;
    }

    return value;
};

/**
 * Convert a multiple byte base 62 value to an integer
 * @param {string} string String containing the multiple byte base 62 value
 * @param {int} position Start position of the characters to decode
 * @param {int} length Number of bytes to decode
 * @returns {int} Decoded integer
 */
var mbValueFromBase62 = function mbValueFromBase62 (string, position, length) {
    var value = 0,
        i = 0,
        charValue;

    for (; i < length; i++) {
        charValue = string.charCodeAt(position + i);

        if (charValue < 58) {
            charValue = charValue - 48;
        } else if (charValue < 91) {
            charValue = charValue - 29;
        } else {
            charValue = charValue - 87;
        }

        value += charValue * Math.pow(62, length - i - 1);
    }

    return value;
};

/**
 * Convert the entirety of a given base 62 string to an integer
 * @param {string} string String containing the base 62 value
 * @returns {int} Decoded integer
 */
var decode = function decode (string) {
    return mbValueFromBase62(string, 0, string.length);
};

/**
 * Convert an integer to a base 62 value
 * @param {int} value Positive integer
 * @returns {string} Base 62 value
 */
var encode = function encode (value) {
    if (value === 0) {
        return '0';
    }

    var string = '';

    while (value > 0) {
        string = chars[value % 62] + string;

        value = Math.floor(value / 62);
    }

    return string;
};

module.exports = {
    mbValueFromBase62: mbValueFromBase62,
    mbValueToBase62: mbValueToBase62,
    sbValueFromBase62: sbValueFromBase62,
    sbValueToBase62: sbValueToBase62,
    decode: decode,
    encode: encode
};
