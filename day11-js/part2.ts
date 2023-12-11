const { open } = require('node:fs/promises');
var fs = require('fs');

const I_AMOUNT = 1000000 - 1;
const isBetween = (start, end, number) => number > start && number < end;
async function part1() {
    const file = await open('input');
    const universeCoords = []
    const inserts = {
        x: [], y: []
    }
    let ix = 0
    for await(let line of file.readLines()) {
        const lineArr = line.split("");
        if(lineArr.every((c) => c === '.'))
            inserts["y"].push(ix);
        if(ix === 0)
            inserts.x = lineArr.map((c, index) => c === '.' ? index : undefined)
        lineArr.forEach((c, x) => {
            if(c === '#') {
                universeCoords.push([x,ix]);
                inserts['x'][x] = undefined;
            }
        })
        ix++;
    }
    inserts['x'] = inserts["x"].filter((item) => item !== undefined);

    let distanceSum = 0;
    universeCoords.forEach(([x,y], ix) => {
        universeCoords.filter((_, i) => i !== ix && i > ix).forEach(([x1,y1]) => {
            const [minX,maxX, minY,maxY] = [Math.min(x1,x),Math.max(x1,x),Math.min(y1,y),Math.max(y1,y)]
            let xInsertsAdjustment = inserts['x'].filter(xC => isBetween(minX,maxX, xC)).length * I_AMOUNT;
            let yInsertsAdjustment = inserts['y'].filter(yC => isBetween(minY,maxY, yC)).length * I_AMOUNT;
            const shortest = maxX-minX+maxY-minY + xInsertsAdjustment + yInsertsAdjustment;
            distanceSum += shortest;
        })
    })
    console.log(distanceSum);
}

part1();