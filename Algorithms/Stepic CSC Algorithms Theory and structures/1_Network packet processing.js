const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin
});

let n, buffer_size;
let lines = [];
let times = [];

let Packet = function(_line, _index){
    this.arrival = parseInt(_line.split(" ")[0]);
    this.duration = parseInt(_line.split(" ")[1]);
    this.next = null;
    this.index = _index;
};

let Queue = function(){
    this.length = 0;
    this.head = null;
    this.tail = null;
    this.time = 0;

    this.add = function (item) {
        if(this.length == 0){
            this.head = item;
            this.tail = item;
            this.length++;
        }
        else{
            this.tail.next = item;
            this.tail = item;
            this.length++;
        }
    };

    this.pop = function () {
        if(this.length == 0){
            return null;
        }
        else{
            let returnPacket = this.head;
            this.head = this.head.next;
            this.length--;
            if(this.head === null)
                this.tail == null;
            return returnPacket;
        }
    };

    this.execute = function () {
        let executable = this.pop();
        times[executable.index] = Math.max(this.time, executable.arrival);
        this.time = Math.max(this.time, executable.arrival) + executable.duration;
    };
};


rl.once('line', (input) => {
    let j = 0;
    [buffer_size,n] = input.split(" ").map((item)=>{return parseInt(item)});
    rl.on('line', (line) => {lines.push(new Packet(line, j++));});
}).on('close', ()=>{

    let queue = new Queue();

    times = new Array(lines.length);

    let first_work = Math.min(buffer_size, n);

    //console.log("first_work: " + first_work);

    for(let i = 0; i < first_work; i++){
        queue.add(lines[i]);
    }

    //console.log("queues.length after first adding: " + queue.length + " buffer_size: " + buffer_size + " n:" + n);

    let add_index = first_work;

    while (queue.length != 0){
        //console.log(queue.length);
        if(add_index < lines.length) {
            if (Math.max(queue.time, queue.head.arrival) + queue.head.duration <= lines[add_index].arrival) {
                queue.execute();
                queue.add(lines[add_index]);
            } else {
                times[add_index] = -1;
            }
            add_index++;
        }
        else {
            queue.execute();
        }
    }

    for(let i = 0; i < lines.length; i++){
        //console.log(lines[i] + '\n');
    }
    //console.log(times.length);
    //console.log("answer_______");
    if(times.length != 0) {
        let ans = "";
        for (let i = 0; i < times.length; i++) {
            ans += times[i] + '\n';
        }
        process.stdout.write(ans);
    }
});