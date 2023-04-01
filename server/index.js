const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();
//middlewares
app.use(cors());
app.use(express.json());


app.get('/', async (req, res) => {
    res.send('Hodlinfo server is running')
})
app.listen(port, () => console.log(`Hodlinfo running on port ${port}`))