function getState(students) {
    return Object.keys(students)
        .map(name => [
            name,
            '(',
            students[name].focus,
            ',',
            students[name].wisdom,
            ')'
        ].join(''))
        .join('; ');
}

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
            _contexts: [],
            _parent: null
        },
        /**
         * Выводит объект всех событий
         */
        print: function () {
            //console.info(this.events);
            return this.events._contexts;
        },
        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} value
         * @param {String} eventType
         */
        on: function (event, context, handler, ...[value= -1, eventType= ' ']) {
            let namespaces = event.split('.');

            let index = this.events._contexts.indexOf(context);
            if (index === -1) {
                this.events._contexts.push(context);
                index = this.events._contexts.length - 1;
            }

            let node = this.events;

            for (let i = 0; i < namespaces.length; i++) {
                if (!node.hasOwnProperty(namespaces[i])) {
                    node[namespaces[i]] = {};

                    node[namespaces[i]]._parent = node
                    node[namespaces[i]]._actions = [];
                }

                node = node[namespaces[i]];

                if (i === namespaces.length - 1) {
                    node._actions.push({
                        index: index,
                        value: value,
                        handler: handler,
                        eventType: eventType
                    })
                    if (eventType[0] === 't') {
                        node._actions[node._actions.length - 1].value = 1;
                    }
                }
            }
            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         */
        off: function (event, context) {
            let namespaces = event.split('.');
            let node = this.events;

            for (let i = 0; i < namespaces.length; i++) {
                if (!node.hasOwnProperty(namespaces[i])) {
                    return this;
                }
                node = node[namespaces[i]];
            }

            if (node._parent === null)
                return this;

            let contextIndex = this.events._contexts.indexOf(context);
            if (contextIndex === -1)
                return this

            function unsubscribe(event, context) {
                event._actions = event._actions.filter(item => {
                    return item.index !== contextIndex;
                })
                for (let subEvent in event) {
                    if (event.hasOwnProperty(subEvent) && subEvent !== '_parent' && subEvent !== '_actions') {
                        unsubscribe(event[subEvent], context);
                    }
                }
            }

            unsubscribe(node);

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         */
        emit: function (event) {
            let namespaces = event.split('.');
            let node = this.events;

            for (let i = 0; i < namespaces.length; i++) {
                if (!node.hasOwnProperty(namespaces[i])) {
                    break;
                }
                node = node[namespaces[i]];
            }

            while (node._parent !== null) {
                for (let i = 0; i < node._actions.length; i++) {
                    let action = node._actions[i];
                    switch (action.eventType[0]) {
                        case ' ':
                            action.handler.apply(this.events._contexts[action.index]);
                            break;
                        case 's': // several
                            if (action.value === 0) {
                                node._actions.splice(i, 1);
                                i -= 1;
                                break;
                            }
                            action.handler.apply(this.events._contexts[action.index]);
                            action.value -= 1;
                            break;
                        case 't':
                            action.value -= 1;
                            if (action.value > 0) {
                                break;
                            }
                            action.handler.apply(this.events._contexts[action.index]);
                            action.value = parseInt(action.eventType.split(':')[1]);
                            break;
                    }
                }
                node = node._parent;
            }

            return this;
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
            if (times <= 0) {
                return this.on(event, context, handler);
            }
            return this.on(event, context, handler, times, 'several');
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
            if (frequency <= 0) {
                return this.on(event, context, handler);
            }
            return this.on(event, context, handler, frequency, ('through:' + frequency));
        }
    };
}

module.exports = {
    getEmitter
};