const robbery = require('./C. 0b11 друзей Аркадия');
const assert = require('assert').strict;

function getMinutes(h, m, oldUtc, newUtc) {
    return (h + (newUtc - oldUtc)) * 60 + m;
}

const gangSchedule = {
    Danny: [{from: 'ПН 12:00+5', to: 'ПН 17:00+5'}, {from: 'ВТ 13:00+5', to: 'ВТ 16:00+5'}],
    Rusty: [{from: 'ПН 11:30+5', to: 'ПН 16:30+5'}, {from: 'ВТ 13:00+5', to: 'ВТ 16:00+5'}],
    Linus: [
        {from: 'ПН 09:00+3', to: 'ПН 14:00+3'},
        {from: 'ПН 21:00+3', to: 'ВТ 09:30+3'},
        {from: 'СР 09:30+3', to: 'СР 15:00+3'}
    ]
};

const bankWorkingHours = {
    from: '10:00+5',
    to: '18:00+5'
};
const moment = robbery.getAppropriateMoment(gangSchedule, 90, bankWorkingHours);
assert.deepEqual(moment.exists(), true);
assert.deepEqual(moment.format('Метим на %DD, старт в %HH:%MM!'), "Метим на ВТ, старт в 11:30!");
assert.deepEqual(moment.tryLater(), true);
//moment.tryLater();
assert.deepEqual(moment.format('%DD %HH:%MM'), 'ВТ 16:00');
assert.deepEqual(moment.tryLater(), true);
assert.deepEqual(moment.format('%DD %HH:%MM'), 'ВТ 16:30');
assert.deepEqual(moment.tryLater(), true);
assert.deepEqual(moment.format('%DD %HH:%MM'), "СР 10:00");
assert.deepEqual(moment.tryLater(), false);
assert.deepEqual(moment.format('%DD %HH:%MM'), "СР 10:00");

const longMoment = robbery.getAppropriateMoment(gangSchedule, 121, bankWorkingHours);
assert.deepEqual(longMoment.exists(), false);
assert.deepEqual(longMoment.format('%DD %HH:%MM'), '');

const gang1 = {
    Danny: [],
    Rusty: [],
    Linus: []
};
const bank1 = {
    from: '00:00+5',
    to: '23:59+5'
};
const everyThirty = robbery.getAppropriateMoment(gang1, 30, bank1);
assert.deepEqual(everyThirty.exists(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:00:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:00:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:01:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:01:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:02:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:02:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:03:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:03:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:04:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:04:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:05:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:05:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:06:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:06:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:07:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:07:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:08:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:08:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:09:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:09:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:10:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:10:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:11:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:11:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:12:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:12:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:13:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:13:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:14:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:14:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:15:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:15:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:16:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:16:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:17:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:17:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:18:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:18:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:19:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:19:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:20:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:20:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:21:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:21:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:22:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:22:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ПН:23:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ВТ:00:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ВТ:00:30');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ВТ:01:00');
assert.deepEqual(everyThirty.tryLater(), true);
assert.deepEqual(everyThirty.format('%DD:%HH:%MM'), 'ВТ:01:30');
assert.deepEqual(everyThirty.exists(), true);

const gang2 = {
    Danny: [{from: 'ПН 14:59+5', to: 'ПН 15:01+5'}],
    Rusty: [{from: 'ВТ 14:59+5', to: 'ВТ 15:01+5'}],
    Linus: []
};
const bank2 = {
    from: '15:00+5',
    to: '15:30+5'
};
const rob2 = robbery.getAppropriateMoment(gang2, 30, bank2);
assert.deepEqual(rob2.exists(), true);
assert.deepEqual(rob2.format('%DD:%HH:%MM'), 'СР:15:00');
assert.deepEqual(rob2.tryLater(), false);
assert.deepEqual(rob2.format('%DD:%HH:%MM'), 'СР:15:00');

{
    const gang3 = {
        Danny: [{from: 'ПН 13:59+4', to: 'ПН 14:01+4'}],
        Rusty: [{from: 'ВТ 13:59+4', to: 'ВТ 14:01+4'}],
        Linus: []
    };
    const bank3 = {
        from: '15:00+5',
        to: '15:30+5'
    };
    const rob3 = robbery.getAppropriateMoment(gang3, 30, bank3);
    assert.deepEqual(rob3.exists(), true);
    assert.deepEqual(rob3.format('%DD:%HH:%MM'), 'СР:15:00');
    assert.deepEqual(rob3.tryLater(), false);
    assert.deepEqual(rob3.format('%DD:%HH:%MM'), 'СР:15:00');
}

{
    const gang4 = {
        Danny: [{from: 'ПН 13:59+5', to: 'ПН 14:01+5'}],
        Rusty: [],
        Linus: []
    };
    const bank4 = {
        from: '01:00+5',
        to: '23:59+5'
    };
    const rob4 = robbery.getAppropriateMoment(gang4, 1379, bank4);
    assert.deepEqual(rob4.exists(), true);
    assert.deepEqual(rob4.format('%DD:%HH:%MM'), 'ВТ:01:00');
    assert.deepEqual(rob4.tryLater(), true);
    assert.deepEqual(rob4.format('%DD:%HH:%MM'), 'СР:01:00');
    assert.deepEqual(rob4.tryLater(), false);
    assert.deepEqual(rob4.format('%DD:%HH:%MM'), 'СР:01:00');
    assert.deepEqual(rob4.tryLater(), false);
    assert.deepEqual(rob4.format('%DD:%HH:%MM'), 'СР:01:00');
    assert.deepEqual(rob4.exists(), true);
    assert.deepEqual(rob4.format('%DD:%HH:%MM'), 'СР:01:00');
}

{
    const gang5 = {
        Danny: [{from: 'ПН 00:00+5', to: 'СР 23:58+5'}],
        Rusty: [],
        Linus: []
    };
    const bank5 = {
        from: '01:00+5',
        to: '23:59+5'
    };
    const rob5 = robbery.getAppropriateMoment(gang5, 1, bank5);
    assert.deepEqual(rob5.exists(), true);
    assert.deepEqual(rob5.format('%DD:%HH:%MM'), 'СР:23:58');
    assert.deepEqual(rob5.tryLater(), false);
    assert.deepEqual(rob5.format('%DD:%HH:%MM'), 'СР:23:58');
}

{
    const gang6 = {
        Danny: [
        ],
        Rusty: [
            {from: 'ПН 00:00+5', to: 'ПН 23:59+5'},
        ],
        Linus: []
    };
    const bank6 = {
        from: '09:00+5',
        to: '18:00+5'
    };
    const rob6 = robbery.getAppropriateMoment(gang6, 60, bank6);
    assert.deepEqual(rob6.exists(), true);
    assert.deepEqual(rob6.format('%DD:%HH:%MM'), 'ВТ:09:00');
    assert.deepEqual(rob6.format('%DD:%HH:%MM'), 'ВТ:09:00');
}