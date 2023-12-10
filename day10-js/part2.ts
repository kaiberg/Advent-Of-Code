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
    const puzzle = {
        x: {}, y: {}
    }

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

    const add = (x,y) => {
        if(puzzle["y"][y] === undefined)
            puzzle['y'][y] = new Set([x])
        else
            puzzle['y'][y].add(x);

        // if(puzzle["x"][x] === undefined)
        //     puzzle['x'][x] = new Set([y])
        // else
        //     puzzle['x'][x].add(y);
    }

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

    const sActual = (() => {
        const [above, below, right, left] = [
            S.y > pathA.y || S.y > pathB.y,
            S.y < pathA.y || S.y < pathB.y,
            S.x < pathA.x || S.x < pathB.x,
            S.x > pathA.x || S.x > pathB.x,
        ]

        if(above && below)
            return '|'
        if(left && right)
            return '-'

        if(above) {
            if(left)
                return 'J'
            if(right)
                return 'L'
        }
        if(below) {
            if(left)
                return '7'
            if(right)
                return 'F'
        }
    })();

    add(S.x, S.y);
    add(pathA.x, pathA.y);
    add(pathB.x, pathB.y);
    while(true) {
        const nextA = findNext(pathA, pathA.p);
        const nextB = findNext(pathB, pathB.p);
        add(nextA.x, nextA.y);
        add(nextB.x, nextB.y);
        if(nextA.x === nextB.x && nextA.y === nextB.y) {
            break;
        }

        pathA.p = { x: pathA.x, y: pathA.y}
        pathB.p = { x: pathB.x, y: pathB.y}
        pathA.x = nextA.x; pathA.y = nextA.y;
        pathB.x = nextB.x; pathB.y = nextB.y;
    }

    let inside = 0
    for (const [key, value] of Object.entries(puzzle.y)) {
        const arr = Array.from(value).map((x) => [x, lines[key][x] === 'S' ? sActual : lines[key][x]]);

        const line = lines[key];
        for(i = 0; i < line.length; i++) {
            if(arr.some(([ix]) => ix === i)) {
                continue;
            }

            const l = arr.filter(([ix, t]) => {
                    const isBefore = i > ix;
                    const isPipe = ['|', 'L', 'J'].includes(t)
                    return isBefore && isPipe;
                }
            ).length;
            if(l % 2 === 1) {
                inside++;
            }
        }
    }

    console.log(inside);
}

part1();