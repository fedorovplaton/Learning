const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let pattern = '';
let text= '';

let p = 1000000007; // simple number
let x = 263;

let answer = '';

let pL;

let hash = function(str){
    let h = 0;
    let $x = 1;
    for(let i = 0; i < str.length; i++){
        h = (h + (str.charCodeAt(i) * $x) % p) % p;
        $x = ($x * x) % p;
    }
    return h;
};

let x_p_1 = function(){
    let j = 1;
    for(let i = 0; i < pL - 1; i++){
        j = (j * x) % p;
    }
    return j;
};

rl.once('line', (input) => {
    pattern = input;
    rl.once('line', (line) => {
        text = line;
    });
}).on('close', ()=>{
    let hash_pattern = hash(pattern);

    pL = pattern.length;

    let currentH = hash(text.slice(text.length - pL,text.length));

    let xp = x_p_1();

    if(currentH == hash_pattern && text.slice(text.length - pL, text.length) == pattern){
        answer = (text.length - pL) + answer;
    }

    for(let i = text.length - pL - 1; i >= 0; i--){
        let newH = ((((p + (currentH - ((text.charCodeAt(i + pL) * xp)%p)))%p) * x) % p + text.charCodeAt(i)) % p;
        //console.log('currentH: ' + currentH + "newH: " + newH + " hP: " + hash_pattern + " reah current hash: " + hash(text.slice(i, i + pL)));
        if(newH == hash_pattern && text.slice(i, i + pL) == pattern){
            answer = i + " " + answer;
        }
        currentH = newH;
    }

    process.stdout.write(answer);

});