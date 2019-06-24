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

// GET
async function onGet(req, res) {
  console.log(req.body);
  db.collection('comments').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.send({data: result})
  })
}
app.get('/',onGet);

// POST
async function onPost(req, res) {
  console.log(req.body);
  const { _id, time, content } = req.body;
    if( !_id || !time || !content ){
        res.sendStatus(403);
  }
  const colle = req.params.name;
  db.collection(colle).save(req.body, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to '+colle);
      res.send(req.body);
  });
}
app.post('/:name', onPost);

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