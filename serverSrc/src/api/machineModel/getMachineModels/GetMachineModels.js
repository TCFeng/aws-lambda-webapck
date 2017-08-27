import { Client } from 'pg'

export default class GetMachineModels {

    constructor() {
        // this.db = db;
    }

    getMachineModels = async () => {
        let data;
        try {
            // if (!this.db) {
            //     console.log('------------DB reinit---------------');
            //     const conString = process.env.RDS_URL;
            //     this.db = new Client(conString);
            //     await this.db.connect();
            // }

            const conString = process.env.RDS_URL;
            const db = new Client(conString);
            await db.connect();
            

            this.getMessage();
            data = await db.query('SELECT * FROM machine_model limit 1');
            await db.end();
        } catch (e) {
            console.log('------', e);
            throw new Error('Query Error!')
        }
        return data;
    }

    getMessage = () => {
        console.log('Show me the money')
    }

}
