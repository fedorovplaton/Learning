const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let answer = "";
let n, m;

let lines = [];

function reverse(str, k){
    if(k === 1)
        return str;
    let new_str = '';
    for(let i = k - 1; i < str.length; i++)
    {
        new_str += str[i];
    }
    if((str.length - k + 1) % 2 === 0)
    {
        for(let i = 0; i < k - 1; i++){
            new_str += str[i];
        }
    }
    else{
        for(let i = k - 2; i >= 0; i--){
            new_str += str[i];
        }
    }
    return new_str;
}

rl.on('line', (t)=>{
    lines.push(t);
}).on('close', ()=>{
    for(let i = 0; i < parseInt(lines[0]); i++){
        if(i !== 0) answer += '\n';
        let n = parseInt(lines[i * 2 + 1]);
        let str = lines[i * 2 + 2];
        let c = str[0];
        let c_num = 0;
        for(let j = 1; j < n; j++){
            if(str[j] < c){
                c = str[j];
                c_num = j;
            }
            if(str[j] === c){
                let k = 1;
                while(j + k < n){
                    if(str[j + k] > str[c_num + k]){
                        break;
                    }
                    else{
                        if(str[j + k] < str[c_num + k]){
                            c_num = j;
                            break;
                        }
                    }
                    k++;
                }
            }
        }
        let k = c_num + 1;
        let not_full_answer = reverse(str, k);

        if(not_full_answer <= str.split('').reverse().join('')){
            answer += not_full_answer + '\n' + k;
        }
        else{
            answer += str.split('').reverse().join('') + '\n' + str.length;
        }
    }
    console.log(answer);
});