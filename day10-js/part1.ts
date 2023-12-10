var fs = require('fs');

// hand, bid
async function part1() {
    const coord = {x: undefined, y: undefined}
    const S = {...coord};

    const lines = fs.readFileSync('input').toString().split('\n');
    let y = 0;
    while (S["y"] === undefined) {
        const sIndex = lines[y].indexOf('S');
        if(sIndex !== -1) {
            S["y"]= y;
            S["x"]= sIndex;
            break;
        }
        y++;
    }
    const pathA = {...coord, p : {...S}};
    const pathB = {...coord, p : {...S}}

    if(S.y > 0) {
        const a = lines[S.y-1][S.x]
        if(['F','7','|'].includes(a)) {
            pathA.x = S.x; pathA.y = S.y-1;
        }
    }
    if(S.y < lines.length-1) {
        const a = lines[S.y+1][S.x]
        if(['|','J','L'].includes(a)) {
            const c = {x: S.x, y: S.y+1};
            if(pathA.x === undefined) {
                pathA.x = c.x; pathA.y = c.y;
            } else {
                pathB.x = c.x; pathB.y = c.y;
            }
        }
    }
    if(S.x > 0) {
        const a = lines[S.y][S.x-1]
        if(['-','F','L'].includes(a)) {
            const c = {x: S.x - 1, y: S.y};
            if (pathA.x === undefined) {
                pathA.x = c.x;
                pathA.y = c.y;
            } else {
                pathB.x = c.x;
                pathB.y = c.y;
            }
        }
    }
    if(S.x < lines[S.y].length-1) {
        const a = lines[S.y][S.x+1]
        if(['-','J','7'].includes(a)) {
        const c = {x: S.x+1, y: S.y};
        if(pathA.x === undefined) {
            pathA.x = c.x; pathA.y = c.y;
        } else {
            pathB.x = c.x; pathB.y = c.y;
        }
        }
    }

    // console.log(pathA,lines[pathA.y][pathA.x]);
    // console.log(pathB,lines[pathB.y][pathB.x]);

    const findNext = (c,p) => {
        const action = lines[c.y][c.x];
        switch (action) {
            case 'F': {
                if(c.x === p.x)
                    return {x:c.x+1, y: c.y};
                return {x:c.x, y: c.y+1}
            }
            case 'L': {
                if(c.y === p.y)
                    return {x: c.x, y:c.y-1};
                return {x: c.x+1, y: c.y};
            }
            case '7': {
                if(c.y === p.y)
                    return {x: c.x, y:c.y+1};
                return {x: c.x-1, y: c.y};
            }
            case 'J': {
                if(c.y === p.y)
                    return {x: c.x, y:c.y-1};
                return {x: c.x-1, y: c.y};
            }
            case '-': {
                if(c.x === p.x-1)
                    return {x: c.x-1, y:c.y};
                return {x: c.x+1, y: c.y};
            }
            case '|': {
                if(c.y === p.y-1)
                    return {x: c.x, y:c.y-1};
                return {x: c.x, y: c.y+1};
            }

        }
    }

    // console.log(S, lines[pathA.y][pathA.x], lines[pathB.y][pathB.x]);

    let n = 1;
    while(true) {
        const nextA = findNext(pathA, pathA.p);
        const nextB = findNext(pathB, pathB.p);
        n++;
        if(nextA.x === nextB.x && nextA.y === nextB.y) {
            break;
        }

        // console.log(`#${n}`);
        // console.log(nextA, lines[nextA.y][nextA.x], )
        // console.log(nextB, lines[nextB.y][nextB.x])
        // console.log(``);

        pathA.p = { x: pathA.x, y: pathA.y}
        pathB.p = { x: pathB.x, y: pathB.y}
        pathA.x = nextA.x; pathA.y = nextA.y;
        pathB.x = nextB.x; pathB.y = nextB.y;
    }
    console.log(n);
}

part1();