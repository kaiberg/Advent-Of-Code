const { open } = require('node:fs/promises');

// hand, bid
async function part1() {
    let sum = 0;
    const file = await open('input');
    for await(let line of file.readLines()) {
        let sequence = line.trim().split(' ').map(Number);

        const getNext = (arr) => {
            const slider = arr.slice(0,-1).map((current, index) => {
                return arr[index+1]-current;
            })
            const v = arr[0];
            if(arr.every(item => item === v)) {
                return v;
            }

            else return getNext(slider)+arr.at(-1);
        }
        const next = getNext(sequence);
        sum += next;
    }

    console.log(sum);
}

part1();