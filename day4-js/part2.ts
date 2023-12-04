const fs = require('fs')

type map = { [key: number]: number }
const sum: map = {};

fs.readFile('input', "utf8", function (err: any, data: string) {
    data.split(/\r?\n/).forEach((line, index) => {
        const cardNumberSeparator = ': ';
        const pastCardNumber = line.indexOf(cardNumberSeparator) + cardNumberSeparator.length;
        const toArr = (input: string) => input.split(' ').filter((i) => typeof parseInt(i) === 'number' && i);

        const [left, right] = line.substring(pastCardNumber).split('|').map((p) => toArr(p));

        const initOrAdd = (key: number, amount = 1) => {
            if (typeof sum[key] === "number") {
                sum[key] += amount;
            } else {
                sum[key] = amount;
            }
        }
        initOrAdd(index + 1);
        right.filter((n) => left.includes(n))
            .forEach((_, filterIndex) => {
                const as = index + filterIndex + 2;
                initOrAdd(as, sum[index + 1]);
            })
    });

    const ans = Object.values(sum).reduce((sum, current) => sum + current)
    console.log(ans);
})

