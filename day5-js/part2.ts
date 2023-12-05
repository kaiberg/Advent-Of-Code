const { open } = require('node:fs/promises');

const isBetween = (start, end, number) => number >= start && number <= end;

async function part1() {
    let lowest = Number.MAX_SAFE_INTEGER;
    const map = []
    let current = 0;
    const file = await open('input');

    for await(const line of file.readLines()) {
        if(!line) {
            current++;
        }

        const items = line.split(' ').filter((i) => !isNaN(parseInt(i))).map((i) => parseInt(i));

        if(!map[current])
            map[current] = [];

        if(items.length) {
            if(current)
                map[current].push(items)
            else
                map[current].push(...items)
        }
    }

    const checked = [];
    for(j = 0; j<=map[0].length; j+=2) {
        let start = map[0][j];
        let end = map[0][j] +map[0][j+1];
        for(seed = start; seed <= end; seed++) {
            // if(checked.filter((m) => isBetween(m[0],m[1], seed)).length)
            //     continue;
            // console.log(seed);
            let location = seed;
            for (i = 1; i < map.length; i++) {
                const lookup = map[i];
                const match = lookup.find((range) =>
                    isBetween(range[1], range[1] + range[2], location)
                );
                location = (!!match) ? match[0] + location - match[1] : location;
            }

            if (lowest > location)
                lowest = location;
        }
    }

    console.log(lowest)
}

part1();