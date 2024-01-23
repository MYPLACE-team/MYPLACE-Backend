import express from 'express'
import cors from 'cors'

import { authRouter } from './src/routes/auth.route'
import { placeRouter } from './src/routes/place.route'

const app = express();
const port = 3000;
app.use(express.json());

app.use('/auth', authRouter);
app.use('/place', placeRouter);

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;   
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; 
    console.log("error", err);
    res.status(err.data.status || status.INTERNAL_SERVER_ERROR).send(response(err.data));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});