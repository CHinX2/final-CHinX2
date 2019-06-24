const bodyParser = require('body-parser');
const express = require('express');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static('public'));

let db = null;

async function main() {
  const DATABASE_NAME = 'heroku_hmphls7b';
  const MONGO_URL = `mongodb://user:a123456@ds241977.mlab.com:41977/${DATABASE_NAME}`;

  // The "process.env.MONGODB_URI" is needed to work with Heroku.
  db = await MongoClient.connect(process.env.MONGODB_URI || MONGO_URL);

  // The "process.env.PORT" is needed to work with Heroku.
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server listening on port ${port}!`);
};

main();

////////////////////////////////////////////////////////////////////////////////

// TODO(you): Add at least 1 GET route and 1 POST route.

// GET comm
async function onGetComm(req, res) {
  const id = req.params.id;
  const collection = db.collection('comments');

  const response = await collection.findOne({ id: id });
  console.log(response);
  res.json(response);
}
app.get('/get/:id',onGetComm);

async function onSaveNComm(req, res) {
  console.log(req.body.id, req.body); 
  const id = req.body.id;
  const ncomm = req.body.comm;
  
  const newvalues = { 
    id: id,
    comm: ncomm
   };
  const collection = db.collection('comments');
  const response = await collection.insertOne(newvalues);
  res.json({ success: true });
}
app.post('/nsave', onSaveNComm);


// Save comm
async function onSaveComm(req, res) {
  console.log(req.body.id, req.body); 
  const id = req.body.id;
  const ncomm = req.body.comm;
  
  let query = {};
  if(id) query = {_id: ObjectId(id)};
  const newvalues = { comm: ncomm };
  const params = { upsert: true };
  const collection = db.collection('comments');
  const response = await collection.update(query, newvalues, params);
  res.json({ success: true });
}
app.post('/save', onSaveComm);

