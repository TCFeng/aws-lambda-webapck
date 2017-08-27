const decorator = require('../../../utils/decorator');
const addBrandService = require('./addBrandService');

exports.handler = decorator.connect( async (event, context, callback) => {
            
            const data = await addBrandService(event.client);
            const response = {
                statusCode: 200,
                body: JSON.stringify({
                message: data
                }),
            };
            callback(null, response);
        });
