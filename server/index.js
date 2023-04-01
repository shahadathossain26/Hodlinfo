import express from 'express'
import cors from 'cors';
import fetch from 'node-fetch';
const app = express();
const port = process.env.PORT || 5000;
import dotenv from 'dotenv';
dotenv.config();
//middlewares
app.use(cors());
app.use(express.json());


async function getPosts() {
    const myTickers = await fetch('https://api.wazirx.com/api/v2/tickers');
    const response = await myTickers.json();
    const tickers = Object.values(response);
    const topTickers = tickers.slice(0, 10);

    console.log(topTickers);
}


getPosts();


app.get('/', async (req, res) => {
    res.send('Hodlinfo server is running')
})

app.listen(port, () => console.log(`Hodlinfo running on port ${port}`))