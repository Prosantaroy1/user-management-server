const express = require('express')
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

//middleware
app.use(cors())
app.use(express.json())




app.get('/', (req, res) => {
    res.send('user management system serve!')
})

//mongodb connect


const uri = `mongodb+srv://${process.env.User_name}:${process.env.User_pass}@cluster0.atafojn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //user collection database
    const userCollection=client.db('UserDB').collection('users');

    //user post
    app.post('/users', async(req, res)=>{
        const query=req.body;
        //console.log(query)
        const result=await userCollection.insertOne(query);
        res.send(result);
    })

    //user get
    app.get('/users', async(ewq, res)=>{
        const data=await userCollection.find().toArray();
        res.send(data);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})