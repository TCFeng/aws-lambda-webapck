// import { db } from '../../../utils/databases';
import GetMachineModels from './GetMachineModels';

exports.handler = async (event, context, callback) => {
    let service = new GetMachineModels();
    const data = await service.getMachineModels();

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: data
        }),
    };
    callback(null, response);
}
