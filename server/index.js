import express from 'express'
import cors from 'cors';
import fetch from 'node-fetch';
const app = express();
import mongodb from 'mongodb';
const { MongoClient, ServerApiVersion } = mongodb;
const port = process.env.PORT || 5000;
import dotenv from 'dotenv';
dotenv.config();
//middlewares
app.use(cors());
app.use(express.json());







const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.g42knj4.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const tickersCollection = client.db('hodlinfo').collection('tickers');

        async function getPosts() {
            const myTickers = await fetch('https://api.wazirx.com/api/v2/tickers');
            const response = await myTickers.json();
            const tickers = Object.values(response);
            const topTickers = tickers.slice(0, 10);
            console.log(topTickers)
            for (let i = 0; i < topTickers.length; i++) {
                const ticker = topTickers[i];
                const newTicker = {
                    name: ticker.name,
                    last: ticker.last,
                    buy: ticker.buy,
                    sell: ticker.sell,
                    volume: ticker.volume,
                    base_unit: ticker.base_unit,

                }
                const storedTicker = await tickersCollection.findOne(newTicker);
                if (!storedTicker) {
                    const result = await tickersCollection.insertOne(newTicker);
                }

            }
        }
        getPosts();

        app.get('/tickers', async (req, res) => {
            const query = {};
            const result = await tickersCollection.find(query).toArray();
            res.send(result);

        })


    }

    finally {

    }

}
run().catch(err => console.error(err));

app.get('/', async (req, res) => {
    res.send('Hodlinfo server is running')
})

app.listen(port, () => console.log(`Hodlinfo running on port ${port}`))