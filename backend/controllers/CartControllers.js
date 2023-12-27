import Mealcity from "../utils/database";
import redisClient from "../utils/redis-db";
import { ObjectId } from 'mongodb';

class CartController {
    async uploadItem(req, res) {
        try {
            const tokenHead = req.headers['X-Token'];
            const user_id = await redisClient.get(`auth_${tokenHead}`);
            const usr = await Mealcity.db.collection('users').findOne({ _id: new ObjectId(user_id) });
            if (!usr) {
                return res.status(400).send({ error: "Unauthorized user"});
            }
            const { name, description, price } = req.body;

            if (!name && !description && !price) {
                return res.status(400).send({error: 'Name, description and price needs to bew provided'});
            }

            const { image } = req.file;
            if (!image) {
                return res.status(400).send({error: "Image need to be provided"});
            }
            const items = await Mealcity.db.collection('Waitlist').insertOne({
                name,
                description,
                price,
                image: image
            });
            return res.status(200).send(items);
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