const request = require('request');
let instance = null;

const QueueHandler = require('./QueueHandler');
let queueHandler = new QueueHandler().getInstance();

/*
    The order of functions is:
    1) enqueueRequest
    2) createObjectForRequest
    3) queueHandler.enqueue()
    4) observeQueue
    5) processQueue
    6) requestGET/POST

    When the request is done, its callback is invoked, which we set with createObjectForRequest IN enqueueRequest, meaning the callback will be executed in scope of enqueueRequest,
    which is the function that is called by getMatchingTradeApiModifiers.
    The response/data from the request is available in enqueueRequest, which we can then resolve.
    Which then is accessible in getMatchingTradeApiModifiers
 */

class RequestHandler {

    constructor() {
        if (instance) {
            return instance;
        }

        this.amountOfGETRequestsMade = 0;
        this.amountOfPOSTRequestsMade = 0;
        this.rateLimit = 18; //per 5s
        this.requestsAreDone = true;

        instance = this;
        return instance;
    }

    getInstance() {
        return instance || new RequestHandler();
    }

    /*
        This gets called when server initializes.
     */
    observeQueue() {
        setInterval(() => {
            console.log('queueSize: ' + queueHandler.size());
            console.log('5s have passed');
            this.processQueue();
        }, 5000)
    }

    processQueue() {
        if(this.requestsAreDone === false) {
            return;
        }

        /*
            If there are requests in the queue, we will process these according to the throttle limit
            aka 4 every 5s
         */
        if(queueHandler.size() !== 0) {
            this.requestsAreDone = false;
            console.log('queue is not empty');
            let forLoopLimit = this.rateLimit;
            if(queueHandler.size() < this.rateLimit) {
                forLoopLimit = queueHandler.size();
            }

            let requestPromisesArray = [];

            for (let i = 0; i < forLoopLimit; i++) {
                let requestPromise = queueHandler.dequeue();

                let requestResultPromise;
                if(requestPromise.requestData.method === 'GET') {
                    requestResultPromise = this.requestGET(requestPromise.requestData.url, requestPromise.callback);
                }
                else if(requestPromise.requestData.method === 'POST') {
                    requestResultPromise = this.requestPOST(requestPromise.requestData.url, requestPromise.requestData.query, requestPromise.callback);
                }
                else {
                    console.log('requestPromise has no method');
                }
                requestPromisesArray.push(requestResultPromise);
            }

            /*
                Wait for all current requests to be done before new requests can be made
             */
            Promise.all(requestPromisesArray).then(() => {
               this.requestsAreDone = true;
            });

        }
        else {
            console.log('queue is empty');
        }
    }

    /*
        This gets called from getMatchingTradeApiModifiers.js. The createObjectForQueue will add an object to the queue, so when the observer checks queue,
        it will say that queue needs to be emptied (observeQueue trigger --> processQueue)
        This will return a promise object containing the response and data from the request
     */
    enqueueRequest(url, method, query) {
        return new Promise((resolve, reject) => {
            this.createObjectForQueue(
                {
                    "url" : url,
                    "method" : method,
                    "query" : query || null
                },
                (error, response, data) => {
                    if (error) {
                        reject(error);
                    }
                    resolve({response, data})
                }
            )
        });
    }

    /*
        This function stores the parameters for the request and the callback for when the request is done.
     */
    createObjectForQueue(requestData, callback) {
        let objectToEnqueue = {
            requestData: requestData,
            callback: callback
        };

        queueHandler.enqueue(objectToEnqueue);
    }

    requestGET(url, callback) {
        return new Promise((resolve, reject) => {
            request({
                        url: url,
                        method: 'GET',
                        timeout: 10000,
                        pool: {
                            maxSockets: 5
                        }
                    },
                    (error, response, body) => {
                        if (error) {
                            console.log(error.code === 'ETIMEDOUT');
                            callback(error, response, body);
                            return reject(error);
                        }

                        console.log('RequestHandler done with GET')
                        this.amountOfGETRequestsMade++;
                        console.log('GET: ' + this.amountOfGETRequestsMade);
                        body = JSON.parse(body);
                        callback(null, response, body);
                        return resolve({ body, response })
                    });
        })
    }

    requestPOST(url, query, callback) {
        return new Promise((resolve, reject) => {
            request({
                        url: url,
                        method: 'POST',
                        json: true,
                        body: query,
                        timeout: 10000,
                        pool: {
                            maxSockets: 5
                        }
                    },
                    (error, response, body) => {
                        if (error) {
                            console.log(error.code === 'ETIMEDOUT');
                            callback(error, response, body);
                            return reject(error);
                        }

                        console.log('RequestHandler done with POST')
                        this.amountOfPOSTRequestsMade++;
                        console.log('POST: ' + this.amountOfPOSTRequestsMade);
                        callback(null, response, body);
                        return resolve({ body, response })
                    });
        });
    }
}

module.exports = RequestHandler;
