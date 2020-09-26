const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let answer = "";

let lines = [];

function toBase(num, base){
    base = BigInt(base);
    let answer = [];
    while(num >= 0){
        if(num >= base){
            let z = BigInt(num / base);
            answer.push(BigInt(num - z * base));
            num = z;
        }
        else{
            answer.push(num);
            num = -1;
        }
    }
    return answer;
}

rl.on('line', (t)=>{
    lines.push(t);
}).on('close', ()=>{
    let t = parseInt(lines[0]);
    for(let i = 0; i < t; i++) {
        if(i !== 0) answer += '\n';
        let [n, k] = lines[i * 2 + 1].split(" ").map(function (x) {
            return parseInt(x);
        });
        let a = lines[i * 2 + 2].split(" ").map(function (x) {
            return BigInt(x);
        });
        let d = toBase(a[0], k);

        let check = true;

        for(let j = 1; j < n; j++) {

            let m = (toBase(a[j], k));

            //console.log('compare: ' + d.join('') + ' and ' + m.join(''));
            if(d.length >= m.length) {
                for (let l = 0; l < m.length; l++) {
                    if(d[l] + m[l] <= BigInt(1)){
                        d[l] = BigInt(1);
                    }
                    else{
                        answer += 'NO';
                        check = false;
                        break;
                    }
                }
            }
            else{
                for (let l = 0; l < d.length; l++) {
                    if(d[l] + m[l] <= BigInt(1)){
                        m[l] = BigInt(1);
                    }
                    else{
                        answer += 'NO';
                        check = false;
                        break;
                    }
                }
                d = m;
            }
            //console.log('result: ' + d.join(''));
            if(!check){
                break;
            }
        }
        if(check) answer += 'YES';
    }



    console.log(answer);
});