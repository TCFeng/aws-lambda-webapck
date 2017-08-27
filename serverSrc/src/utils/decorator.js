const Client = require('pg').Client;
const { cn } = require('./pg');

const response = {
        statusCode: 500,
        body: 'ERROR',
    };

module.exports = {

    connect: function (func) {
        function wrapper(...args) {
            let client = new Client(cn);
            let event = args[0];
            let callback = args[2];

            client.connect(
                function (err) {
                    if (err) {
                        console.error("fail to connect database, ", err);
                        callback(null, response);
                        return;
                    };
                    console.log("### DB CONNECTED ###");
                    event.client = client;
                    args[2] = (...args) => {
                        if (client !== null) {
                            client.end(function (err) {
                                if (err) console.error("fail to end database, ", err);
                                console.log("### DB END ###");
                                return callback.apply(this, args);
                            });
                        } else {
                            return callback.apply(this, args);
                        }
                    };
                    console.log(args[2].toString());
                    return func.apply(this, args);
                });
        }
        return wrapper;
    }
};