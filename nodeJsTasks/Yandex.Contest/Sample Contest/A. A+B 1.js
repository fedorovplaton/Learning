//const fs = require('fs');
const readline = require('readline');

/*const rl = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    terminal: false

});*/

const rl = readline.createInterface({
    input: process.stdin
});

//process.stdout.write(answer.toString());

let a, b;
let c = [];

rl.once('line', (line)=>{
    a = line.split(" ")[0].split("");
    b = line.split(" ")[1].split("");
}).on('close', () => {

    a = a.reverse();
    b = b.reverse();

    let deg = (a.length > b.length)?(a.length - b.length):(b.length-a.length);

    if(a.length > b.length) {
        c.length = a.length + 1;
        for(let i = 0; i < deg; i++) {
            b.push(0);
        }
    }
    else {
        c.length = b.length + 1;
        for(let i = 0; i < deg; i++)
            a.push(0);
    }

    for(let i = 0; i < c.length; i++) {
        c[i] = 0;
    }

    //console.log(c.length);

    let clength = c.length;

    for(let i = 0; i < clength - 1; i++) {
        c[i] += parseInt(a[i]) + parseInt(b[i]);
        c[i + 1] += parseInt((c[i])/10);
        c[i] = parseInt(c[i]) % 10;
    }

    if(c[c.length - 1] == 0)
        c.pop();

    //console.log(c.reverse().join(""));
    //fs.appendFileSync("output.txt", c.reverse().join("")); // + '\n' + a.join("") + '\n' + b.join(""));
    process.stdout.write(c.reverse().join(""));
});