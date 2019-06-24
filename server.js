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
  const response = await collection.findOne({ _id: id });
  res.json(response);
}
app.get('/get/:id',onGetComm);

// Save comm
async function onSaveComm(req, res) {
  console.log(req.body);
  
  const id = req.body.id;
  const time = req.body.time;
  const comm = req.body.comm;

  const doc = {
    _id: id,
    time: time,
    comm: comm
  };
  const collection = db.collection('comments');
  const response = await collection.insertOne(doc);

}
app.post('/save', onSaveComm);

// PUT
async function onPut(req, res) {
  console.log(req.params.name,req.params.id, req.body); 
  const newvalues = {$set: req.body};
  const obj = {_id: req.params.id};
  const colle = req.params.name;
  db.collection(colle).updateOne(obj, newvalues, function(err, obj) {
      if (err) throw err;
      console.log("comment update");
      res.send('update success');
  });
}
app.put('/:name/:id', onPut);