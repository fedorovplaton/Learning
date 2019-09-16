const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let n;
let e;
let d;

let r = [];

let links = [];

let answer = "1";

let lines = [];

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
        return;
    }
    if(r[i_ID] > r[j_ID]){
        links[j_ID] = i_ID;
    }
    else{
        if(r[i_ID] == r[j_ID]){
            links[j_ID] = i_ID;
            r[i_ID]++;
        }
        else{
            links[i_ID] = j_ID;
        }
    }
};

rl.once('line', (input) => {
    n = parseInt(input.split(" ")[0]);
    e = parseInt(input.split(" ")[1]);
    d = parseInt(input.split(" ")[2]);
    rl.on('line', (line)=>{
        lines.push(line);
    })

}).on('close', ()=>{

    for(let i = 0; i <= n; i++){
        links[i] = i;
    }

    for(let i = 0; i <= n; i++){
        r[i] = 0;
    }

    for(let i = 0 ; i < e; i++){
        let k = lines[i].split(" ")[0];
        let l = lines[i].split(" ")[1];
        union(k, l);
    }

    for(let i = e; i < lines.length; i++){
        let k = lines[i].split(" ")[0];
        let l = lines[i].split(" ")[1];
        if(find_ID(k) == find_ID(l)){
            answer = "0";
            break;
        }
    }

    process.stdout.write(answer);

});