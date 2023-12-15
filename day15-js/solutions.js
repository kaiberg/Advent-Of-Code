const text = document.body.innerText.split('\n')[0];
let a = 0;

const alg = (s) => {
    let asc = 0
    for(i=0;i<s.length;i++) {
        asc+=s.charCodeAt(i);
        asc=(asc*17)%256;
    }
    return asc;
}

text.split(',').forEach(ins => {
    asc = alg(ins);
    a+=asc;
})
console.log(a);

const b = {};

text.split(',').forEach(ins => {
    let asc = 0;
    const m = ins.indexOf('-');

    if(m === -1) {
        let e = ins.indexOf('=');
        let box = alg(ins.substring(0,e))
        if(!b[box]) {
            b[box] = new Map();
        }

        const key = ins.substring(0,e), n =  Number.parseInt(ins.substring(e+1));
        b[box].set(key,n)
    } else {
        let box = alg(ins.substring(0,m))
        if(b[box])
            b[box].delete(ins.slice(0,-1))
    }
})

let b1 = 0;

Object.entries(b).forEach(([key,v]) => {
    let i = 0
    for(let a of v.values()) {
        i++;
        b1+=(Number.parseInt(key)+1)*i*a;
    }
})
console.log(b1);