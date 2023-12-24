import usercontroller from '../controllers/UserControllers';
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
}