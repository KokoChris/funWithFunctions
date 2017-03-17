var assert = require('assert');

function add(a, b) {
    return a + b;
}
function sub(a, b) {
    return a - b;
}
function mul(a, b) {
    return a * b;
}

function identityf(sample) {
    return function () {
        return sample;
    }
}
function addf(x) {
    return function (y) {
        return x + y;
    }
}
function lift(binaryFunc) {
    return function (x) {
        return function (y) {
            return binaryFunc(x, y);
        }
    }
}
function curry(binaryFunc, x) {
    return function (y) {
        return binaryFunc(x, y);
    }
}
function inc(x) {
    return add(x, 1);
}
function twice(binary) {
    return function (x) {
        return binary(x, x);
    }
}

function reverse(binary) {
    return function (first, second) {
        return binary(second, first);
    }
}

function composeu(unary1, unary2) {
    return function (x) {
        return unary2(unary1(x));
    }
}
function composeb(binary1, binary2) {
    return function (x, y, z) {
        return binary2(binary1(x, y), z);
    }
}
function limit(binary, count) {
    //closure power
    return function (a, b) {
        if (count >= 1) {
            count -= 1;
            return binary(a, b);
        }
        return undefined;
    }
}
function from(x) {
    return function () {
        var next = start;
        start += 1;
        return next;
    }
}
function to(gen, end) {
    return function () {
        var value = gen();
        if (value < end) {
            return value;
        }
        return undefined;
    }
}
var doubl = twice(add);
var square = twice(mul);
var index = from(0);

//inc = addf(1);
//inc = liftf(add)(1);
//inc = curry(add,1);
assert.equal(lift(add)(5)(5), 10);
assert.equal(curry(add, 5)(5), 10)
assert.equal(inc(5), 6);
assert.equal(inc(inc(5)), 7);
assert.equal(doubl(11), 22);
assert.equal(square(11), 121);
assert.equal(composeu(doubl, square)(5), 100);
assert.equal(composeb(add, mul)(2, 3, 7), 35)
assert.equal(index(), 0);
assert.equal(index(), 1);