const { open } = require('node:fs/promises');

// hand, bid
async function part1() {
    const file = await open('input');

    const grouped = {
        "5a": [],
        "4a": [],
        "3a" : [],
        "3b": [],
        "2a": [],
        "1a": [],
        "0a": []
    }
    const LETTER_TO_ORDER = {
        "A":1, "K":2, "Q":3, "T":5, "9":6, '8':7, "7":8, '6':9, '5':10, '4':11, "3":12,  "2":13, "J": 14
    }

    for await(const line of file.readLines()) {
        let [card, number] = line.trim().split(' ');
        number = Number(number);
        const hand = [card,number];


        let counts = card.split('')
            .reduce((acc, char) => {
                acc[char] = acc[char] ? acc[char]+1 : 1
                return acc;
            }, {})

        let increase = counts['J'] || 0;
        if(counts['J']) {
            increase = counts['J'];
            delete counts['J']
        }

        counts = Object.values(counts).sort((a,b) => b-a);
        counts[0] += increase;
        if(increase === 5)
            counts = [5]

        switch (counts[0]) {
            case 5: {
                grouped["5a"].push(hand);
                break;
            }
            case 4: {
                grouped["4a"].push(hand);
                break;
            }
            case 3: {
                if(counts[1] == 2) {
                    grouped["3a"].push(hand);
                } else {
                    grouped["3b"].push(hand);
                }
                break;

            }
            case 2:{
                if(counts[1] == 2) {
                    grouped["2a"].push(hand);
                } else {
                    grouped["1a"].push(hand);
                }
                break;

            }
            case 1: {
                grouped["0a"].push(hand);
                break;
            }

        }
    }
    Object.values(grouped).forEach((array) => {
        array.sort((a,b) => {
            for(const [ix,char] of a[0].split("").entries()) {
                const bchar = b[0][ix]
                if(char !== bchar) {
                    return LETTER_TO_ORDER[bchar]-LETTER_TO_ORDER[char];
                }
            }
        })
    })

    let sum = 0
    let rank = 1
    Object.entries(grouped).reverse().forEach(([_, arr]) => {
        for(const [_, value] of arr) {
            sum+=rank*value;
            rank++;
        }
    })

    console.log(sum);

}

part1();