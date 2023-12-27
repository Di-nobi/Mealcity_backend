import usercontroller from '../controllers/UserControllers';
import cartcontroller from '../controllers/CartControllers';
// import Authcontroller from '../controllers/AuthController';
import express from 'express';

export default function Routes(app) {
const router = express.Router();
app.use('/', router);
router.post('/users', (req, res) => {
    usercontroller.createNew(req, res);
});

router.post('/login', (req, res) => {
    usercontroller.login(req, res);
});
// router.get('/connect', (req, res) => {
//     Authcontroller.connect(req, res);
// });
router.get('/disconnect', (req, res) => {
    usercontroller.disconnect(req, res);
});
router.get('/users/me', (req, res) => {
    usercontroller.getMe(req, res);
});

router.post('/upload', (req, res) => {
    cartcontroller.uploadItem(req, res);
});

router.put('/updatePassword', (req, res) => {
    usercontroller.updatePassword(req, res);
});

}