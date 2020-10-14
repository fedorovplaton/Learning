'use strict';

const assert = require('assert').strict;
const { getEmitter } = require('./D. Аркадию пора на пары');

let students = {
    Sam: {
        focus: 100,
        wisdom: 50
    },
    Sally: {
        focus: 100,
        wisdom: 60
    },
    Bill: {
        focus: 90,
        wisdom: 50
    },
    Sharon: {
        focus: 110,
        wisdom: 40
    }
};

let lecturer = getEmitter();

// С началом лекции у всех резко повышаются показатели
lecturer
    .on('begin', students.Sam, function () {
        this.focus += 10;
    }).on('begin', students.Sally, function () {
        this.focus += 10;
    }).on('begin', students.Bill, function () {
        this.focus += 10;
        this.wisdom += 5;
    }).on('begin', students.Sharon, function () {
        this.focus += 20;
    });

// На каждый слайд внимательность падает, но растет мудрость
lecturer
    .on('slide', students.Sam, function () {
        this.wisdom += Math.round(this.focus * 0.1);
        this.focus -= 10;
    })
    .on('slide', students.Sally, function () {
        this.wisdom += Math.round(this.focus * 0.15);
        this.focus -= 5;
    })
    .on('slide', students.Bill, function () {
        this.wisdom += Math.round(this.focus * 0.05);
        this.focus -= 10;
    })
    .on('slide', students.Sharon, function () {
        this.wisdom += Math.round(this.focus * 0.01);
        this.focus -= 5;
    });

// На каждый веселый слайд всё наоборот
lecturer
    .on('slide.funny', students.Sam, function () {
        this.focus += 5;
        this.wisdom -= 10;
    })
    .on('slide.funny', students.Sally, function () {
        this.focus += 5;
        this.wisdom -= 5;
    })
    .on('slide.funny', students.Bill, function () {
        this.focus += 5;
        this.wisdom -= 10;
    })
    .on('slide.funny', students.Sharon, function () {
        this.focus += 10;
        this.wisdom -= 10;
    });


// Начинаем лекцию
lecturer.emit('begin');
// Sam(110,50); Sally(110,60); Bill(100,55); Sharon(130,40)

lecturer
    .emit('slide.text')
    .emit('slide.text')
    .emit('slide.text')
    .emit('slide.funny');
// Sam(75,79); Sally(95,118); Bill(65,63); Sharon(120,34)

lecturer
    .off('slide.funny', students.Sharon)
    .emit('slide.text')
    .emit('slide.text')
    .emit('slide.funny');
// Sam(50,90); Sally(85,155); Bill(40,62); Sharon(105,37)

lecturer
    .off('slide', students.Bill)
    .emit('slide.text')
    .emit('slide.text')
    .emit('slide.text');

lecturer.emit('end');
// Sam(20,102); Sally(70,191); Bill(40,62); Sharon(90,40)

{
    let students2 = {
        Sam: {
            v: 0
        },
        Sally: {
            v: 100
        }
    };
    let lecturer2 = getEmitter();
    lecturer2
        .on('add', students2.Sam, function () {
            this.v += 1;
        })
        .on('add', students2.Sam, function () {
            this.v += 1;
        })
        .on('add.plus.two', students2.Sally, function () {
            this.v += 200;
        })
    lecturer2
        .emit('add')
        .emit('add.plus.two');
    assert.deepEqual(lecturer2.print(), [{v:4},{v:300}]);
    lecturer2
        .off('add.plus.two.three', students2.Sam)
        .off('foo', students2.Sam)
        .off('add.foo', students2.Sam)
        .off('add.plus.foo', students2.Sally)
        .off('add.pls.dfdf.dfdfdf.dfdf.dfdf.dfdfdf.df', students2.Sally);
    assert.deepEqual(lecturer2.print(), [{v:4},{v:300}]);
    lecturer2.off('add', students2.Sam);
    lecturer2.off('add', students2.Sally);
    assert.deepEqual(lecturer2.print(), [{v:4},{v:300}]);
    lecturer2
        .emit('add')
    assert.deepEqual(lecturer2.print(), [{v:4},{v:300}]);
}

{
    let students3 = {
        Sam: {
            v: 0
        }
    };
    let lecturer3 = getEmitter();
    lecturer3
        .on('a', students3.Sam, function () {
            this.v += 1;
        })
        .on('a.b', students3.Sam, function () {
            this.v += 10;
        })
        .on('a.c', students3.Sam, function () {
            this.v += 100;
        })
        .on('a.b.d', students3.Sam, function () {
            this.v += 1000;
        })
        .on('a.b.c', students3.Sam, function () {
            this.v += 1000;
        })
        .on('a.c.d', students3.Sam, function () {
            this.v += 10000;
        })
    lecturer3
        .emit('a.c.d')
        .emit('a.b.c')
    assert.deepEqual(lecturer3.print(), [{v:11112}]);
    lecturer3
        .off('a', students3.Sam)
        .emit('a.c.d')
        .emit('a.b.c')
        .emit('a.b.d')
        .emit('a.c')
        .emit('a.b')
    assert.deepEqual(lecturer3.print(), [{v:11112}]);
}

{
    let s = {
        Sam: {
            v: 0
        }
    };
    function multi () {
        this.v *= 2;
    }
    function add() {
        this.v += 1;
    }
    let l = getEmitter();
    l
        .on('a', s.Sam, multi)
        .on('a.b', s.Sam, add)
        .on('a.b.c', s.Sam, add);
    l.emit('a.b.c');
    assert.deepEqual(l.print(), [{v:4}]);
    l.emit('a.b');
    assert.deepEqual(l.print(), [{v:10}]);
    l.emit('a');
    assert.deepEqual(l.print(), [{v:20}]);
}

{
    let s = {
        Sam: {
            v: 0
        }
    };
    function multi () {
        this.v *= 2;
    }
    function add() {
        this.v += 1;
    }
    let l = getEmitter();
    l
        .on('a.b.c', s.Sam, add)
        .on('a.b', s.Sam, add)
        .on('a', s.Sam, multi);
    l.emit('a.b.c');
    assert.deepEqual(l.print(), [{v:4}]);
    l.emit('a.b');
    assert.deepEqual(l.print(), [{v:10}]);
    l.emit('a');
    assert.deepEqual(l.print(), [{v:20}]);
}

{
    let s = {
        Sam: {
            v: 0
        }
    };
    function multi () {
        this.v *= 2;
    }
    function add() {
        this.v += 1;
    }
    let l = getEmitter();
    l
        .on('a', s.Sam, add)
        .on('a', s.Sam, multi)
    l.emit('a');
    assert.deepEqual(l.print(), [{v:2}]);
}

{
    let s = {
        Sam: {
            v: 0
        }
    };
    function multi () {
        this.v *= 2;
    }
    function add() {
        this.v += 1;
    }
    let l = getEmitter();
    l
        .on('a', s.Sam, multi)
        .on('a', s.Sam, add)
    l.emit('a');
    assert.deepEqual(l.print(), [{v:1}]);
}

{
    lecturer = getEmitter();
    assert.deepEqual(lecturer.print(), []);
    let platon = {v: 0};
    lecturer.on('go', platon, function (){this.v += 100});
    assert.deepEqual(lecturer.print(), [{v:0}]);
}

{
    lecturer = getEmitter();
    let students = {
        platon:{v:0},
        denis:{v:0},
        fedor:{v:0}
    };
    lecturer.on('a', students.fedor, function (){this.v += 100});
    lecturer.on('b', students.fedor, function (){this.v += 100});
    lecturer.on('c', students.platon, function (){this.v += 100});
    lecturer.on('a', students.denis, function (){this.v += 100});
    lecturer.on('b', students.fedor, function (){this.v += 100});
    lecturer.on('c', students.platon, function (){this.v += 100});
    lecturer.on('a', students.fedor, function (){this.v += 100});
    lecturer.on('b', students.fedor, function (){this.v += 100});
    lecturer.on('c', students.denis, function (){this.v += 100});
    lecturer.on('a', students.denis, function (){this.v += 100});
    lecturer.on('c', students.denis, function (){this.v += 100});
    lecturer.on('c', students.fedor, function (){this.v += 100});

    lecturer.on('a.to', students.fedor, function (){this.v += 100});
    lecturer.on('b.to', students.platon, function (){this.v += 100});
    lecturer.on('c.to', students.denis, function (){this.v += 100});
    lecturer.on('a.to', students.fedor, function (){this.v += 100});
    lecturer.on('b.to', students.platon, function (){this.v += 100});
    lecturer.on('c.to', students.denis, function (){this.v += 100});
    lecturer.on('a.to', students.fedor, function (){this.v += 100});
    lecturer.on('b.to', students.platon, function (){this.v += 100});
    lecturer.on('c.to', students.denis, function (){this.v += 100});
    lecturer.on('a.to', students.fedor, function (){this.v += 100});
    lecturer.on('b.to', students.platon, function (){this.v += 100});
    lecturer.on('c.to', students.denis, function (){this.v += 100});

    lecturer.off('a', students.fedor);
    lecturer.off('b', students.fedor);
    lecturer.off('c', students.fedor);
    lecturer.off('a', students.denis);
    lecturer.off('b', students.denis);
    lecturer.off('c', students.denis);
    lecturer.off('a.to', students.platon);
    lecturer.off('b.to', students.platon);
    lecturer.off('c.to', students.platon);

    lecturer.emit('a');
    lecturer.emit('b');
    assert.deepEqual(lecturer.print(), [{v:0},{v:0},{v:0}]);
    lecturer.emit('c');
    assert.deepEqual(lecturer.print(), [{v:0},{v:200},{v:0}]);
    lecturer.off('c', students.platon);
    lecturer.emit('c');
    assert.deepEqual(lecturer.print(), [{v:0},{v:200},{v:0}]);
    students.platon.v = 0;
    assert.deepEqual(lecturer.print(), [{v:0},{v:0},{v:0}]);


    lecturer.on('a', students.platon, function (){this.v += 1});
    lecturer.on('a', students.platon, function (){this.v += 1});
    lecturer.on('a', students.platon, function (){this.v += 1});
    lecturer.on('a', students.platon, function (){this.v += 1});
    lecturer.on('a', students.platon, function (){this.v += 1});
    lecturer.on('a', students.platon, function (){this.v *= 2});
    lecturer.on('a.b', students.platon, function (){this.v += 1});
    lecturer.on('a.b', students.platon, function (){this.v += 1});
    lecturer.on('a.b', students.platon, function (){this.v *= 2});
    lecturer.on('a.b.c', students.platon, function (){this.v += 1});
    lecturer.on('a.b.c', students.platon, function (){this.v += 1});
    lecturer.on('a.b.c', students.platon, function (){this.v *= 2});

    lecturer.emit('a.b.c');
    assert.deepEqual(lecturer.print(), [{v:0},{v:34},{v:0}]);
}