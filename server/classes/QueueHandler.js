let instance = null;

class QueueHandler {

    constructor() {
        if (instance) {
            return instance;
        }

        this.queue = [];

        instance = this;
        return instance;
    }

    getInstance() {
        return instance || new QueueHandler();
    }

    enqueue(item) {
        this.queue.push(item);
    }

    dequeue() {
        return this.queue.shift();
    }

    size() {
        return this.queue.length;
    }

    peak() {
        return (this.queue[0] !== null) ? this.queue[0] : null;
    }
}

module.exports = QueueHandler;
