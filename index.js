const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gh0wlz3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);
const run = async() => {
    try{
        const loanApplicantsCollection = client.db('Dygnify').collection('loan_applicants');

        app.post('/addApplication', async(req, res) => {
            const applicationInfo = req.body;
            const result = await loanApplicantsCollection.insertOne(applicationInfo);
            res.send(result);
        })

    }
    finally{}
}
run().catch(err => console.log(err));




app.get('/', (req, res) => {
    res.send('Loan Server Running');
});

app.listen(port, ()=>{
    console.log(`Loan server running on ${port}`);
});
