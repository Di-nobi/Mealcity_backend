import { MongoClient } from 'mongodb';

const host = process.env.DB_HOST || 'localhost';
const database = process.env.DB_DATABASE || 'mealcity';
const port = process.env.DB_PORT || '27017';
const conn = `mongodb://${host}:${port}`;

class Mealcity {
    constructor () {
        this.client = new MongoClient(conn, { useUnifiedTopology: true, useNewUrlParser: true });
        this.client.connect().then(() => {
            this.db = this.client.db(database);
        }).catch((err) => {
            console.log(`An error occured` + err);
        });
    }

    isAlive() {
        if (this.client.isConnected()) {
          return true
        }
        return false
    }

    async getUsers() {
        const countusr = await this.db.collection('users').countDocuments();
        return countusr;
    }

    async getWaitlist() {
        const countList = await this.db.collection('Lists').countDocuments();
        return countList;
    }
}

module.exports = new Mealcity();