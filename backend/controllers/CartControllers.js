import database from "../utils/database";
import redisDb from "../utils/redis-db";
import { ObjectId } from 'mongodb';

class CartController {
    async uploadItem(req, res) {
        const tokenHead = req.headers('X-Token');
        const user_id = await redisDb.get(`auth_${tokenHead}`);
        const usr = await database.db.collection('users').findOne({ _id: new ObjectId(user_id) });
        if (!usr) {
            return res.status(400).send({ error: "Unauthorized user"});
        }
        
    }
}

const cartcontroller = new CartController();
export default cartcontroller;