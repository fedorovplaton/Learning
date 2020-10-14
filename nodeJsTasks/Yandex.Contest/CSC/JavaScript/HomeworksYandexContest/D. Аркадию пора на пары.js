/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    return {

        /**
         * Объект событий
         */
        events: {
            /*
            'slide': {
                handler: {function} handler
                contexts: []
            }
             */
        },
        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         */
        on: function (event, context, handler) {

            if (!this.events.hasOwnProperty(event)) {
                this.events[event].handler = handler;
                this.events[event].contexts = [];
            }

            this.events[event].contexts.push(context);

            console.info(event, context, handler);
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         */
        off: function (event, context) {
            console.info(event, context);
        },

        /**
         * Уведомить о событии
         * @param {String} event
         */
        emit: function (event) {
            console.info(event);
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }
    };
}

module.exports = {
    getEmitter
};