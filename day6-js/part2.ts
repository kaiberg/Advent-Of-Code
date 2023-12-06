const { open } = require('node:fs/promises');
type info = {
    time: number
    dist: number
}
async function part1() {
    let data: info = {
        dist:0,
        time:0
    }
    let ix = 0;
    const file = await open('input');

    for await(const line of file.readLines()) {
        const comma = line.indexOf(':');
        const n = parseInt(line.substring(comma+1).trim().split(/ +/).reduce((acc: string, current: string) =>
            acc+current
        , ''))

            if(ix === 0) {
                data.time = n;
            } else {
                data.dist = n
            }

        ix++;
    }

    const {dist: d, time: t} = data;
    // x*(t-x)= d
    // -x^2+tx-d == 0
    // -t plusminus sqrt(t^2-4(-1)(-d))
    // divided by
    // 2(-1)
    //
    // >> -t pm sqrt(t^2-4d)/-2

    let x1 = (-t + Math.sqrt(Math.pow(t,2)-4*d))/(-2), x2 = (-t - Math.sqrt(Math.pow(t,2)-4*d))/(-2);
    x1 = Math.floor(x1);
    x2 = Math.floor(x2);
    const ans = Math.max(x1,x2)-Math.min(x1,x2);
    console.log(ans);
}

part1();