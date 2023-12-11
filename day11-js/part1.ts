const { open } = require('node:fs/promises');
var fs = require('fs');

// hand, bid
async function part1() {
    const lines = []
    const file = await open('input');
    const universeCoords = []
    let distanceSum = 0
    for await(let line of file.readLines()) {
        if(line.split("").every((c) => c === '.'))
            lines.push(line);
        lines.push(line);
    }
    const inserts = []
    for(x = 0; x<lines[0].length; x++) {
        let allEmpty = true;
        for(y = 0; y<lines.length; y++) {
            if(lines[y][x] !== '.') {
                allEmpty = false;
                break;
            }
        }
        if(allEmpty === true)
            inserts.push(x + inserts.length);
    }
    for(i = 0; i<lines.length;i++)
        inserts.forEach(ix => lines[i] = lines[i].slice(0,ix) + '.' + lines[i].slice(ix))

    const mY = lines.length, mX = lines[0].length;

    for(y = 0; y<mY; y++) {
        const universes = lines[y].split("").forEach((c, x) => {
            if(c === '#')
                universeCoords.push([x,y]);
        })
    }

    universeCoords.forEach(([x,y], ix) => {
        universeCoords.filter((v, i) => i !== ix).forEach(([x1,y1]) => {
            const shortest = Math.max(x1,x)-Math.min(x1,x)+Math.max(y1,y)-Math.min(y1,y)
            distanceSum+= shortest
        })

    })
    console.log(distanceSum/2);
}

part1();