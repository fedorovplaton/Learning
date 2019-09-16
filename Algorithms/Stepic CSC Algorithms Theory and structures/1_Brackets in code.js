const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let line;

rl.once('line', (input) => {
    line = input;
}).on('close', ()=>{
    let ans = '';
    let a = [];
    let b = [];
    for(let i = 0; i < line.length; i++){

        if(line[i] == '(' || line[i] == '{' || line[i] == '['){
            a.push(line[i]);
            b.push(i);
            continue;
        }

        if(line[i] == ')'){
            if(a.length == 0 || a.pop() !== '('){
                ans = "" + (i + 1);
                break;
            }
            b.pop();
            continue;
        }

        if(line[i] == '}'){
            if(a.length == 0 || a.pop() !== '{'){
                ans = "" + (i + 1);
                break;
            }
            b.pop();
            continue;
        }

        if(line[i] == ']'){
            if(a.length == 0 || a.pop() !== '['){
                ans = "" + (i + 1);
                break;
            }
            b.pop();
            continue;
        }
    }

    if(ans == ''){
        ans = "Success";
        if(line[b[0]] == '(' || line[b[0]] == '{' || line[b[0]] == '['){
            ans = (b[0] + 1).toString();
        }
    }
    process.stdout.write(ans);
});