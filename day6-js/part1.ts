const { open } = require('node:fs/promises');
type info = {
    time: number
    dist: number
}
async function part1() {
    let sum = 1
    let data: info[] = []
    let dataIndex = 0
    const file = await open('input');

    for await(const line of file.readLines()) {
        const comma = line.indexOf(':');
        const n = line.substring(comma+1).trim().split(/ +/).map(Number);
        n.forEach((number : number,ix : number) => {
            if(dataIndex === 0) {
                data.push({
                    time: number,
                    dist: 0
                })
            } else {
                data[ix].dist = number
            }
        });

        dataIndex++;
    }

    data.forEach(({time, dist}) => {
        let ways = 0;
        for(let i = 0; i<=time; i++) {
            const distance = i*(time-i);
            if(distance > dist)
                ways++;
        }

        sum*=ways;
    })

    console.log(sum);
}

part1();