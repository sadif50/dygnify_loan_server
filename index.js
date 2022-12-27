const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// MongoDB URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gh0wlz3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);
const run = async() => {
    try{
        const loanApplicantsCollection = client.db('Dygnify').collection('loan_applicants');

        // Get all applications
        app.get('/applications', async(req, res) => {
            const query = {};
            const applications = await loanApplicantsCollection.find(query).toArray();
            res.send(applications);
        });

        // Get application by ID
        app.get('/applications/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const application = await loanApplicantsCollection.findOne(query);
            res.send(application);
        });

        // Application data sent to mongoDB
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
