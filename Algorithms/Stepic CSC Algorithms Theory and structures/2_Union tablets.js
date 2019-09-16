const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let n; // Count of tablets
let m; // Count of commands

let r = []; // r[i] - count elements in 'i' table

let links = []; // links on the parent
let commands = []; // union commands

let max = -1;

let answer = "";

let find_ID = function(i){
    if(links[i] == i)
        return i;
    let d = find_ID(links[i]);
    links[i] = d;
    return d;
};

let union = function(i, j){
    let i_ID = find_ID(i);
    let j_ID = find_ID(j);
    if(i_ID == j_ID){
        answer = answer + max + '\n';
        return;
    }
    if(r[i_ID] > r[j_ID]){
        links[j_ID] = i_ID;
        r[i_ID] += r[j_ID];
        max = Math.max(r[i_ID], max);
    }
    else{
        links[i_ID] = j_ID;
        r[j_ID] += r[i_ID];
        max = Math.max(r[j_ID], max);
    }
    answer = answer + max + '\n';
};

rl.once('line', (input) => {
    n = parseInt(input.split(" ")[0]);
    m = parseInt(input.split(" ")[1]);
    rl.once('line', (line) => {
        r = line.split(" ").map((item)=>{return parseInt(item)});
        rl.on('line', (command)=>{
            commands.push(command);
        });
    });
}).on('close', ()=>{
    for(let i = 0; i < n; i++)
        links.push(i);

    r.map((item)=>{max = Math.max(item, max)});

    for(let i = 0; i < commands.length; i++){
        let l = parseInt(commands[i].split(" ")[0]);
        let k = parseInt(commands[i].split(" ")[1]);
        union(l - 1, k - 1);/*
        console.log("union: " + (l - 1) + " and " + (k-1));
        console.log("r: " + r.join(" "));
        console.log("links: " + links.join(" "));*/
    };

    process.stdout.write(answer);
});