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
function from(start) {
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

function fromTo(start, end) {
    var counter = 0;
    return function () {
        if (counter < end) {
            var value = counter;
            counter += 1;
            return value;
        }
        return undefined;

    }
}
//better fromTo (cleaner ---> reusing functions)
function betterFromTo(start, end) {
    return to(from(start), end);
}

function element(letters, gen) {
    //account for missing gen function
    if (gen === undefined) {
        gen = fromTo(
            0,
            array.length
        );
    }
    return function () {
        var currentIteration = gen();
        if (currentIteration !== undefined) {
            return letters[currentIteration]
        }
        return undefined;
    }
}

function collect(gen, array) {
    return function () {
        var value = gen();
        if (value !== undefined) {
            array.push(value);
        }
        return value;
    }
}
function filter(gen, predicate) {
    return function () {
        var value = gen();
        if (predicate(value)) {
            return value;
        }
        return undefined;
    }
}
function concat(gen1, gen2) {
    var gen = gen1;
    return function () {
        var value = gen();
        if (value !== undefined) {
            return value;
        }
        gen = gen2();
        return gen();
    };
}
function gensymf(genChar) {
    var val = 0;
    return function () {
        val += 1;
        return genChar.toString() + val.toString();
    }
}

function counter(counterValue) {

    return {
        up() {
            counterValue += 1;
            return counterValue;
        },
        down() {
            counterValue -= 1;
            return counterValue;
        }
    }
}

var object = counter(10);
console.log(object.up());
console.log(object.down());

//Not correct!!!!!!!!
// function fibonaccif(first, second) {
//     var helperIndex = fromTo(0, 2);
//     var args = arguments;
//     return function actual() {
//         var index = helperIndex();
//         if (index !== undefined) {
//             return args[index] + (args[index-1] ? args[index-1] : 0);
//         }
//         first = second;
//         second = first + second;

//         helperIndex = fromTo(0, 2);
//         return actual();
//     }
// }
var doubl = twice(add);
var square = twice(mul);
var index = from(0);
var index2 = fromTo(0, 3);
var index3 = betterFromTo(0, 3);
var ele = element(['a', 'b', 'c', 'd'], fromTo(1, 3));
var fil = filter(fromTo(0, 5), function third(value) {
    return (value % 3 === 0);
});
var geng = gensymf('G');
// var fib = fibonaccif(0, 1);
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
assert.equal(index2(), 0);
assert.equal(index2(), 1);
assert.equal(index2(), 2);
assert.equal(index2(), undefined);
assert.equal(index3(), 0);
assert.equal(index3(), 1);
assert.equal(index3(), 2);
assert.equal(index3(), undefined);
assert.equal(ele(), 'a');
assert.equal(fil(), 0);
assert.equal(fil(), undefined);
assert.equal(fil(), undefined);
assert.equal(fil(), 3);
assert.equal(geng(), "G1");
assert.equal(geng(), "G2");



console.log("All Passed!!!")