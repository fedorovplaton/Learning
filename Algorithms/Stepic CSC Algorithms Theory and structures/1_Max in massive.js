const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let n;
let answer = '';
let lines = [];
let arr = [];
let m;

lines = [];

let Node = function(_value){
    this.value = _value;
    this.next = null;
    this.prev = null;
};

let Queue = function(){
    this.head = null;
    this.back = null;
    this.push = function (new_elem) {
        if(this.head === null){
            this.head = new_elem;
            this.back = new_elem;
        }
        else{
            new_elem.next = this.back;
            this.back.prev = new_elem;
            this.back = new_elem;
        }
    };

    this.pop = function () {
        if(this.head !== null){
            let node_return = this.head;
            if(this.head.prev !== null) {
                this.head = this.head.prev;
                this.head.next = null;
                node_return.prev = null;
                return node_return;
            }
            else{
                this.head = null;
                this.back = null;
                return node_return;
            }
        }
    };

    this.pop_back = function () {
        if(this.back !== null){
            if (this.head == this.back){
                this.head = null;
                this.back = null;
            }
            else{
                this.back = this.back.next;
                this.back.prev = null;
            }
        }
    };

    this.push_back = function (new_elem) {
        while(this.back !== null && this.back.value < new_elem.value){
            this.pop_back();
        }
        this.push(new_elem);
    };

    this.take_max = function () {
        if(this.head !== null)
            return this.head.value;
        else{
            return -Infinity;
        }
    };

    this.delete_elem = function (del_elem) {
      if(this.head !== null && this.head.value == del_elem){
          this.pop();
      }

    };

    this.print = function () {
        if(this.head !== null){
            let arr = this.head;
            let print_str = "print: ";
            while(arr !== null){
                print_str = print_str + arr.value + " ";
                arr = arr.prev;
            }
            console.log(print_str);
        }
        else {
            console.log("queue is missing");
        }

    }



};

rl.once('line', (input) => {
    n = parseInt(input);
    rl.on('line', (line) => {
        lines.push(line);
    });
}).on('close', ()=>{
    arr = lines[0].split(" ").map((item)=>{return parseInt(item)});
    m = parseInt(lines[1]);

    let queue = new Queue();
    for(let i = 0; i < m; i++){
        queue.push_back(new Node(arr[i]));
    }

    answer += queue.take_max() + " ";

    for(let i = m; i < arr.length; i++){
        queue.push_back(new Node(arr[i]));
        queue.delete_elem(arr[i - m]);
        answer += queue.take_max() + " ";
    }

    process.stdout.write(answer);
});