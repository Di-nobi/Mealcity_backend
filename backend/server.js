import express from 'express';
import Routes from './routes';

const port = process.env.PORT || 5000;
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());
Routes(app);
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

export default app;