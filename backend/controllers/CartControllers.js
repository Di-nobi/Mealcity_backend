import Mealcity from "../utils/database";
import redisClient from "../utils/redis-db";
import { ObjectId } from 'mongodb';

class CartController {
    async uploadItem(req, res) {
        try {
            const tokenHead = req.headers('X-Token');
            const user_id = await redisClient.get(`auth_${tokenHead}`);
            const usr = await Mealcity.db.collection('users').findOne({ _id: new ObjectId(user_id) });
            if (!usr) {
                return res.status(400).send({ error: "Unauthorized user"});
            }
            const { name, description, price, image } = req.body;

            if (!name) {
                return res.status(400).send({error: 'Name is Missing'});
            }

            if (!description) {
                return res.status(400).send({error: "Description can't be missing"});
            }

            if (!price) {
                return res.status(400).send({error: 'Item price does not exist'});
            }

            if (usr) {
                const items = await Mealcity.db.collection('Waitlist').insertOne({
                    name,
                    description,
                    price,
                    image
                });
                return res.status(200).send(items);
            }
        }catch (err) {
            console.log(`An error occured on the server ${err}`);
        }
        
    }

    // async getItem(req, res) {
    //     const 
    // }
}

const cartcontroller = new CartController();
export default cartcontroller;