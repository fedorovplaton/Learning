const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let answer = "";

rl.once('line', (input) => {
    n = parseInt(input);
}).on('close', ()=>{
    let d = new Array(n + 1);

    d[0] = Infinity;
    d[1] = 0;

    for(let i = 2; i <= n; i++){
        let a, b, c;
        a = (i % 3 == 0)?d[i / 3]:Infinity;
        b = (i % 2 == 0)?d[i / 2]:Infinity;
        c = d[i - 1];

        d[i] = Math.min(a,b,c) + 1;
    }

    let _n = n;

    answer = '' + _n;

    while(d[_n] != 0){
        answer = " " + answer;
        if(_n % 3 == 0 && d[_n / 3] == d[_n] - 1){
            _n /= 3;
            answer = _n + answer;
            continue;
        }
        if(_n % 2 == 0 && d[_n / 2] == d[_n] - 1){
            _n /= 2;
            answer = _n + answer;
            continue;
        }
        _n -= 1;
        answer = _n + answer;
    }

    process.stdout.write(d[n].toString()+ '\n' + answer);
});