const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let n; // Count of commands
let m; // size of hashed;

let answer = "";

let lines = [];

let p = 1000000007; // simple number
let x = 263;

let hashed = [];


let Node = function(_str){
    this.str = _str;
    this.next = null;
};

let hash = function(str){
    let h = 0;
    let $x = 1;
    for(let i = 0; i < str.length; i++){
        h = (h + (str.charCodeAt(i) * $x) % p) % p;
        $x = ($x * x) % p;
    }
    return h % m;
};

let add_to_hashed = function(index, name){
    //console.log("adding " + name);
    if(hashed[index] === null){
        hashed[index] = new Node(name);
    }
    else{
        let tail = hashed[index];
        //console.log(tail);
        while(tail.next !== null){
            if(tail.str == name)
                return;
            tail = tail.next;
        }
        if(tail.str !== name)
            tail.next = new Node(name);
    }
};

let delete_name = function (index, name) {
    if(hashed[index] === null)
        return;
    let tail = hashed[index];

    if(tail.str == name && tail.next === null){
        hashed[index] = null;
        return;
    }
    if(tail.str == name && tail.next !== null){
        hashed[index] = tail.next;
        return;
    }
    while(tail.next !== null){
        if(tail.next.str == name) {
            if (tail.next.next === null) {
                tail.next = null;
                return;
            } else {
                tail.next = tail.next.next;
                return;
            }
        }
        tail = tail.next;
    }
};

let find_name = function(index, name){
    let ans = 'no\n';

    let tail = hashed[index];
    while(tail !== null){
        if(tail.str == name){
            ans = 'yes\n';
            break;
        }
        tail = tail.next;
    }
    answer += ans;
};

let print = function(index){
    let tail = hashed[index];
    let ans = '';
    while(tail !== null){
        ans = tail.str + " " + ans;
        tail = tail.next;
    }
    answer += ans + '\n';
};


rl.once('line', (_m) => {
    m = parseInt(_m);
    rl.once('line', (_n)=>{
        n = parseInt(_n);
        rl.on('line', (command)=>{
            lines.push(command);
        });
    });
}).on('close', ()=>{
    hashed = new Array(m);
    for(let i = 0; i < m; i++){
        hashed[i] = null;
    }

    //console.log(hash('world'));
    //console.log(hash('HellO'));
    //console.log(hash('test'));


    for(let i = 0; i < lines.length; i++){
        if(lines[i][0] == 'a'){
            let $str = lines[i].split(" ")[1];
            add_to_hashed(hash($str), $str);
        }
        if(lines[i][0] == 'd'){
            let $str = lines[i].split(" ")[1];
            delete_name(hash($str), $str);
        }
        if(lines[i][0] == 'f'){
            let $str = lines[i].split(" ")[1];
            find_name(hash($str), $str);
        }
        if(lines[i][0] == 'c'){
            let check_index = parseInt(lines[i].split(" ")[1]);
            print(check_index);
        }
    }
    process.stdout.write(answer);

});

/*
4
64
add test
add test
add test
add platon
add fedor
add hui
add one
add two
add three
add four
add five
add six
add seven
add eight
add nine
add ten
add test
add platon
add fedor
add hui
add one
add two
add three
add four
add five
add six
add seven
add eight
add nine
add ten
check 0
check 1
check 2
check 3
del eight
del three
del five
del one
del six
del platon
del seven
del ten
check 0
check 1
check 2
check 3
del ffgfgfg
del ffgfgfg
find fedor
find hui
find one
find two
find three
find four
find five
find six
find seven
find eight
find nine
find ten
find test
*/

/*
4
21
add four
add two
check 0
del four
check 0
add four
check 0
del two
check 0
add four
add two
add test
check 0
del two
del four
del test
check 0
del two
del four
del test
check 0
 */
