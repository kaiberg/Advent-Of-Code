const fs = require('fs')

let sum = 0;

fs.readFile('input', "utf8", function (err, data) {
    data.split(/\r?\n/).forEach((line) => {
        const cardNumberSeparator = ': ';
        const pastCardNumber = line.indexOf(cardNumberSeparator) + cardNumberSeparator.length;
        const toArr = (input) => input.split(' ').filter((i) => typeof parseInt(i) === 'number' && i);

        const [left,right] = line.substring(pastCardNumber).split('|').map((p) => toArr(p));

        const {length} = right.filter((n) => left.includes(n));
        if(length === 0) {
            return;
        }

        sum += Math.pow(2, length - 1);
    });

    console.log(sum);
})