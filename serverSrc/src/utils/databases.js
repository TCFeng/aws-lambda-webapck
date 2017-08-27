import { Client } from 'pg'
const conString = process.env.RDS_URL;
// const conString = "pg://postgres:postgres@wisvm.cdb5i7ralu63.us-east-1.rds.amazonaws.com:5432/wisvm";
const db = new Client(conString);

const init = async () => {
    await db.connect();
}

init();
console.log('--------connection!!!!-----');

module.exports = { db };
