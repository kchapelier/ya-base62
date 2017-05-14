"use strict";

var b62 = require('../'),
    should = require('chai').should();

describe('Base62', function () {
    describe('Single byte methods', function () {
        it('should return expected values', function () {
            b62.sbValueToBase62(0).should.equal('0');
            b62.sbValueToBase62(10).should.equal('a');
            b62.sbValueToBase62(35).should.equal('z');
            b62.sbValueToBase62(36).should.equal('A');
            b62.sbValueToBase62(61).should.equal('Z');

            b62.sbValueFromBase62('0', 0).should.equal(0);
            b62.sbValueFromBase62('a', 0).should.equal(10);
            b62.sbValueFromBase62('z', 0).should.equal(35);
            b62.sbValueFromBase62('A', 0).should.equal(36);
            b62.sbValueFromBase62('Z', 0).should.equal(61);
        });

        it('should allow to read from a given position of a string', function () {
            var string = 'abcz';

            b62.sbValueFromBase62(string, 0).should.equal(10);
            b62.sbValueFromBase62(string, 1).should.equal(11);
            b62.sbValueFromBase62(string, 2).should.equal(12);
            b62.sbValueFromBase62(string, 3).should.equal(35);
        });
    });

    describe('Multiple bytes methods', function () {
        it('should return expected values', function () {
            b62.mbValueToBase62(0, 1).should.equal('0');
            b62.mbValueToBase62(10, 1).should.equal('a');
            b62.mbValueToBase62(35, 1).should.equal('z');
            b62.mbValueToBase62(36, 1).should.equal('A');
            b62.mbValueToBase62(61, 1).should.equal('Z');

            b62.mbValueFromBase62('0', 0, 1).should.equal(0);
            b62.mbValueFromBase62('a', 0, 1).should.equal(10);
            b62.mbValueFromBase62('z', 0, 1).should.equal(35);
            b62.mbValueFromBase62('A', 0, 1).should.equal(36);
            b62.mbValueFromBase62('Z', 0, 1).should.equal(61);
        });

        it('should support decoding from a given position of a string', function () {
            var string = 'abcz';

            b62.mbValueFromBase62(string, 0, 1).should.equal(10);
            b62.mbValueFromBase62(string, 1, 1).should.equal(11);
            b62.mbValueFromBase62(string, 2, 1).should.equal(12);
            b62.mbValueFromBase62(string, 3, 1).should.equal(35);
        });

        it('should support decoding a value of multiple bytes', function () {
            b62.mbValueFromBase62('FF1BFF', 2, 2).should.equal(99);
            b62.mbValueFromBase62('FFd0sFF', 2, 3).should.equal(50000);
            b62.mbValueFromBase62('FF4zXyLE1GvFF', 2, 9).should.equal(999999999999999);
        });

        it('should support encoding a value of multiple bytes', function () {
            b62.mbValueToBase62(99, 2).should.equal('1B');
            b62.mbValueToBase62(50000, 3).should.equal('d0s');
            b62.mbValueToBase62(999999999999999, 9).should.equal('4zXyLE1Gv');
        });

        it('should pad the encoded base 62 value with 0 as needed', function () {
            b62.mbValueToBase62(1, 2).should.equal('01');
            b62.mbValueToBase62(1, 3).should.equal('001');
            b62.mbValueToBase62(62, 4).should.equal('0010');
            b62.mbValueToBase62(0, 5).should.equal('00000');
        });
    });

    describe('Encode and decode methods', function () {
        it('should return expected values', function () {
            b62.encode(0).should.equal('0');
            b62.encode(99).should.equal('1B');
            b62.encode(50000).should.equal('d0s');
            b62.encode(999999999999999).should.equal('4zXyLE1Gv');

            b62.decode('0').should.equal(0);
            b62.decode('1B').should.equal(99);
            b62.decode('d0s').should.equal(50000);
            b62.decode('4zXyLE1Gv').should.equal(999999999999999);
        });
    });
});
