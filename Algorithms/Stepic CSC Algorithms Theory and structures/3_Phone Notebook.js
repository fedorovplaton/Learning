const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let n; // Count of commands

let answer = "";

let lines = [];

let p = 16769023; // simple number
let a = 5;
let b = 10;

let hashed = [];


let hash = function(phone_number){
    return ((a * phone_number) % p + b) % p;
};


rl.once('line', (input) => {
    n = parseInt(input);
    rl.on('line', (command)=>{
        lines.push(command);
    });
}).on('close', ()=>{
    hashed = new Array(p);
    for(let i = 0; i < p; i++){
        hashed[i] = "";
    }


    for(let i = 0; i < lines.length; i++){
        if(lines[i][0] == 'a'){
            let index = hash(lines[i].split(" ")[1]);
            let name = lines[i].split(" ")[2];
            hashed[index] = name;
            continue;
        }
        if(lines[i][0] == 'f'){
            let index = hash(lines[i].split(" ")[1]);
            if(hashed[index] != ""){
                answer += hashed[index] + '\n';
                continue;
            }
            else{
                answer += 'not found' + '\n';
                continue;
            }
        }
        if(lines[i][0] == 'd'){
            let index = hash(lines[i].split(" ")[1]);
            hashed[index] = '';
        }
    }
    process.stdout.write(answer);
});