const { open } = require('node:fs/promises');

// hand, bid
async function part1() {
    const END_NODE = 'ZZZ'
    let node : string | undefined = 'AAA', steps=  0;
    const directions : ('L' | 'R')[] = []
    const table : {
        [key: string]: { 'L': string, 'R': string }
    } = {}
    const file = await open('input');
    let past = (false);
    for await(let line of file.readLines()) {
        if(!line) {
            past= true;
            continue;
        }

        line = line.trim();

        if(!past) {
            directions.push(...line.split(""))
        } else {
            let [cnode,children] = line.split('=');
            cnode = cnode.trim();
            const start = children.indexOf('('), end = children.indexOf(')');
            const [left, right] = children
                .substring(start+1, end)
                .split(',')
                .map((s : string) => s.trim());

            table[cnode] = { L: left, R: right}
        }
    }
    while (node !== END_NODE) {
        const direction = directions[steps%directions.length];
        node = table[node as keyof typeof table][direction]
        steps++;
    }
    console.log(steps);

}

part1();