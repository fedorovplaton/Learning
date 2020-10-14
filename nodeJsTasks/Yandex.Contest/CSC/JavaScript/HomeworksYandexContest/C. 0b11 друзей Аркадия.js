'use strict';

const isExtraSolved = true;

const DAYS = {
    'ПН': 0,
    'ВТ': 1440,
    'СР': 2880,
    'ЧТ': 4320,
    'ПТ': 5760,
    'СБ': 7200,
    'ВС': 8640
};

function foo(schedule, duration, workingHours) {
    let bankUTC;
    let bankStart;
    let bankEnd;
    {
        let from = workingHours.from;
        let to = workingHours.to;

        bankUTC = from.split('+')[1];

        let bankFrom = from.split('+')[0];
        let bankTo = to.split('+')[0];

        let bankHoursFrom = parseInt(bankFrom.split(':')[0]);
        let bankMinutesFrom = parseInt(bankFrom.split(':')[1]);

        let bankHoursTo = parseInt(bankTo.split(':')[0]);
        let bankMinutesTo = parseInt(bankTo.split(':')[1]);

        bankStart = bankHoursFrom * 60 + bankMinutesFrom;
        bankEnd = bankHoursTo * 60 + bankMinutesTo;
    }
    let busyIntervals = [];
    for (let robber in schedule) {
        if (!schedule.hasOwnProperty(robber)) continue;
        for (let i = 0; i < schedule[robber].length; i++) {
            let from = schedule[robber][i].from;
            let to = schedule[robber][i].to;

            let dayFrom = from.split(" ")[0];
            let dayTo = to.split(" ")[0];

            let utc = from.split('+')[1];

            let timeFrom = from.split(' ')[1].split('+')[0];
            let timeTo = to.split(' ')[1].split('+')[0];

            let hoursFrom = parseInt(timeFrom.split(':')[0]);
            let minutesFrom = parseInt(timeFrom.split(':')[1]);
            let hoursTo = parseInt(timeTo.split(':')[0]);
            let minutesTo = parseInt(timeTo.split(':')[1]);

            let start = hoursFrom * 60 + minutesFrom;
            let end = hoursTo * 60 + minutesTo;

            //console.log(dayFrom + ':' + DAYS[dayFrom]);
            start += (bankUTC - utc) * 60 + DAYS[dayFrom];
            //console.log(dayTo + ':' + DAYS[dayTo]);
            end += (bankUTC - utc) * 60 + DAYS[dayTo];

            busyIntervals.push([start, end]);
        }
    }
    //console.log('busyIntervals v2.0');
    //console.log(busyIntervals);

    function createArray(from, to) {
        let arr = [];
        for (let i = from; i <= to; i++) {
            arr.push(i)
        }
        return arr;
    }

    let monday = new Set(createArray(bankStart, bankEnd));
    let tuesday = new Set(createArray(bankStart + 1440, bankEnd + 1440));
    let wednesday = new Set(createArray(bankStart + 2880, bankEnd + 2880));
    {
        function difference(setA, setB, from, to) {
            let _difference = new Set(setA);
            for (let elem of setB) {
                if (setB.has(elem - 1) && setB.has(elem + 1)) {
                    _difference.delete(elem);
                }
            }
            //_difference.add(from);
            //_difference.add(to);
            return _difference;
        }

        for (let i = 0; i < busyIntervals.length; i++) {
            let arr = createArray(busyIntervals[i][0], busyIntervals[i][1]);
            let busySet = new Set(arr);
            monday = difference(monday, busySet, bankStart, bankEnd);
            tuesday = difference(tuesday, busySet, bankStart + 1440, bankEnd + 1440);
            wednesday = difference(wednesday, busySet, bankStart + 2880, bankEnd + 2800);
        }
    }

    function getIntervalFromSet(set) {
        let intervals = [];
        let arr = Array.from(set).sort((a, b) => a - b);

        //console.log(arr.join(':'));

        if (arr.length < 1) return [];

        let a = arr[0], b = arr[0];
        if (arr.length === 1) return [[a, b]];

        for (let i = 1; i < arr.length; i++) {
            if (arr[i] === b + 1) {
                b++;
                continue;
            }
            if (b - a >= duration) {
                //console.log(a, b);
                intervals.push([a, b]);
            }
            a = arr[i];
            b = arr[i];
        }
        if (b - a >= duration) {
            //console.log(a, b);
            intervals.push([a, b]);
        }
        return intervals;
    }

    let m = getIntervalFromSet(monday);
    let t = getIntervalFromSet(tuesday);
    let w = getIntervalFromSet(wednesday);

    return {
        monday: m,
        tuesday: t,
        wednesday: w
    };
}

/**
 * @param {Object} schedule Расписание Банды
 * @param {number} duration Время на ограбление в минутах
 * @param {Object} workingHours Время работы банка
 * @param {string} workingHours.from Время открытия, например, "10:00+5"
 * @param {string} workingHours.to Время закрытия, например, "18:00+5"
 * @returns {{duration: number, intervals: [*, *][], print(), later: boolean, tryLater(): *, format(string): string, isExtraSolved: boolean, exists(): boolean}}
 */
function getAppropriateMoment(schedule, duration, workingHours) {

    let boo = foo(schedule, duration, workingHours);
    let intervals2 = boo.monday.concat(boo.tuesday).concat(boo.wednesday);

    return {
        /**
         * Временные интервалы, когда можно грабить
         */
        isExtraSolved: true,
        intervals: intervals2,
        duration: duration,
        later: false,
        /**
         * Найдено ли время
         * @returns {boolean}
         */
        exists() {
            return this.intervals.length !== 0;
        },
        print() {
            //console.log(this.intervals);
        },

        /**
         * Возвращает отформатированную строку с часами
         * для ограбления во временной зоне банка
         *
         * @param {string} template
         * @returns {string}
         *
         * @example
         * ```js
         * getAppropriateMoment(...).format('Начинаем в %HH:%MM (%DD)') // => Начинаем в 14:59 (СР)
         * ```
         */
        format(template) {
            if (!this.exists())
                return '';

            let s = this.intervals[0][0];
            if (s < 1440) {
                template = template.replace('%DD', 'ПН');
            } else {
                if (s < 2880) {
                    template = template.replace('%DD', 'ВТ');
                    s -= 1440;
                } else {
                    template = template.replace('%DD', 'СР');
                    s -= 2880;
                }
            }

            function getRightVision(int) {
                if (int < 10) return '0' + int
                return int.toString();
            }

            let h = Math.floor(s / 60);
            let m = Math.floor(s - h * 60);
            template = template.replace('%HH', getRightVision(h));
            template = template.replace('%MM', getRightVision(m));

            return template;
        },

        tryLater() {
            if (this.intervals.length === 0)
                return false;

            if (this.intervals.length === 1) {
                if (this.intervals[0][1] - this.intervals[0][0] - 30 >= this.duration) {
                    this.intervals[0][0] += 30;
                    return true;
                } else {
                    return false;
                }
            }

            if (this.intervals.length > 1) {
                if (this.intervals[0][1] - this.intervals[0][0] - 30 >= this.duration) {
                    this.intervals[0][0] += 30;
                } else {
                    this.intervals.shift();
                }
                return true;
            }
        }
    };
}

module.exports = {
    getAppropriateMoment,
    isExtraSolved
};