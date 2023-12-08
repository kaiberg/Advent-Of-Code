const { open } = require('node:fs/promises');

// hand, bid
async function part1() {
    let nodes : string[] = [], steps=  [];
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

            if(cnode.endsWith('A')) {
                nodes.push(cnode);
                steps.push(0);
            }
        }
    }

    while (!nodes.every(n => n.endsWith('Z'))) {
        for(let i = 0; i < nodes.length; i++) {
            const node = nodes[i], step = steps[i];
            if(nodes[i].endsWith('Z')) {
                continue;
            }
            const direction = directions[step%directions.length];
            nodes[i] = table[node as keyof typeof table][direction]
            steps[i]++;
        }
    }

    // https://stackoverflow.com/a/49722579
    const gcd = (a: number, b: number) : number => a ? gcd(b % a, a) : b;
    const lcm = (a: number, b: number) : number => a * b / gcd(a, b);
    console.log(steps.reduce(lcm));
}

part1();