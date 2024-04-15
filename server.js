var express = require("express")
const { MongoClient, ServerApiVersion } = require('mongodb');
var app = express()
const uri = "mongodb+srv://wongfuksang:kIULkqxnLjlhZ7r3@cluster0.dgztchd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1, strict: true, deprecationErrors: true,
    }
});


async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db("Dogs").collection('Breed');
        console.log(collection);
    } catch (ex) {
        console.error(ex);
    }
}

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/api/dogs', (req, res) => {
    getAllCards((err, result) => {
        if (!err) {
            res.json({ statuscode: 200, data: result, message: 'get all dogs success' })
        }
    });
});

app.post('/api/dogs', (req, res) => {
    const formData = req.body;
    postCard(formData, (err, result) => {
        if (!err) {
            res.json({ statusCode: 200, data: result, message: 'post all dogs success' });
        }
    })
});

getAllCards = (callback) => {
    collection.find({}).toArray((err, result) => {
        if (!err) {
            callback(null, result);
        } else {
            callback(err, null);
        }
    })
}

postCard = (formData, callback) => {
    collection.insertOne(formData, (err, result) => {
        if (!err) {
            callback(null, result);
        } else {
            callback(err, null);
        }
    })
}


app.listen(3000, () => {
    console.log('express server started');
    runDBConnection();
});


