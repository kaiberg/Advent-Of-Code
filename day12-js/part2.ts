const { open } = require('node:fs/promises');
var fs = require('fs');

// hand, jd
async function part1() {
    const damaged = '#', unknown = '?', operational = '.', nSep= ',';
    let count = 0;
    let map = {};
    const combinations = (left, nums) => {
        const situation = `${left}-${nums}`
        if(situation in map)
            return map[situation];
        if(!nums.length)
            return left.includes(damaged) ? 0  : 1

        let tree = 0;
        if([unknown, operational].includes(left[0]))
            tree += combinations(left.slice(1), nums)

        if([unknown, damaged].includes(left[0]))
            if(left.length >= nums[0] &&
                !left.slice(0,nums[0]).includes(operational) &&
                left[nums[0]] !== damaged
            )
                tree += combinations(left.slice(nums[0]+1), nums.slice(1))

        map[situation] = tree;
        return tree;
    }

    const file = await open('input');
    for await(const line of file.readLines()) {
        let [springs, numbers] = line.split(' ');
        springs = Array(5).fill(springs).join(unknown)
        numbers = Array(5).fill(numbers).join(nSep)
        numbers = numbers.split(nSep).map(Number);
        count += combinations(springs, numbers);
    }
    console.log(count);
}

part1();

