const { open } = require('node:fs/promises');

// hand, bid
async function part1() {
    let sum = 0;
    const file = await open('input');
    for await(let line of file.readLines()) {
        let sequence = line.trim().split(' ').map(Number);

        const getPrevious = (arr) => {
            const slider = arr.slice(0,-1).map((current, index) => {
                return arr[index+1]-current;
            })
            const v = arr[0];
            if(arr.every(item => item === v)) {
                return v;
            }

            else return arr.at(0)-getPrevious(slider);
        }
        const next = getPrevious(sequence);
        sum += next;
    }

    console.log(sum);
}

part1();