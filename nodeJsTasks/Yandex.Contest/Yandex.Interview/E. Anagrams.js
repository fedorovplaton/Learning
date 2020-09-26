const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    terminal: false

});

function f(str) {
    var ob = {};
    for(var i = 0; i < str.length; i++){
        if(ob.hasOwnProperty(str[i]))
            ob[str[i]]++;
        else
            ob[str[i]] = 1;
    }
    return ob;
}

function compare(a, b) {
    for(sv in a){
        if(a[sv] != b[sv])
            return "0";
    }
    return "1";

}

var lines = [], k, l;

rl.on('line', (a) => {lines.push(a)
}).on('close', ()=>{
    const [k, l] = lines;
    var ob_k = f(k), ob_l = f(l);/*
    var str = "";
    for(var c in ob_k){
        str += "c: "+ c + " ob_k[c]: " + ob_k[c] + " ob_b[l] " + ob_l[c] + '\n';
    }
    fs.appendFileSync("output.txt", str + "\n");*/
    if(k.length == l.length)
        fs.appendFileSync("output.txt", compare(ob_k, ob_l));
    else
        fs.appendFileSync("output.txt", "0");
});