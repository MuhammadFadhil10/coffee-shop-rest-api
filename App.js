import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/', (req, res, next) => {
	res.send('hello world');
});

app.listen(process.env.PORT || 5000, () => console.log('server running..'));
