const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static('public'));

let db = null;
let collection = null;
async function main() {
  const DATABASE_NAME = 'ccuCourse';
  const MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;

  // The "process.env.MONGODB_URI" is needed to work with Heroku.
  db = await MongoClient.connect(process.env.MONGODB_URI || MONGO_URL);
  collection = db.collection('courses')
  // The "process.env.PORT" is needed to work with Heroku.
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server listening on port ${port}!`);
  // var file="code_table.json";
  // var result=JSON.parse(fs.readFileSync( file));
  // tmp = {};
  // // for (prop in result) {
  //     tmp[prop] = result[prop];
  //     // result[prop].map((o)=>{
  //     //     console.log(o);
  //     //     console.log(`Document id: ${result.insertedId}`);
  //     //     return o;
  //     // });
  //
  // }
  // db.collection('codeTable').insertOne(tmp);
};

main();

////////////////////////////////////////////////////////////////////////////////

// TODO(you): Add at least 1 GET route and 1 POST route.


// console.log(result);
// console.log(db);


app.get("/api/getData/:name",onGet);
app.get("/api/getData/",onGet);
async function onGet(req,res) {
    const name = req.params.name;
    let cursor = null;
    console.log("GET data");
    console.log(name);
    // cursor = await collection.find();
    if(!name){
        cursor = await collection.find();
    }else{
        cursor = await collection.find({"class_name":{$regex:name}});
    }
    console.log("num = ",collection.find({"class_name":/name/}).count() );
    let cnt = 0;
    let tmp = {};
    while (await cursor.hasNext()) {
        const result = await cursor.next();
        console.log(result);
        tmp[cnt++] = result;
    }

    res.json(tmp);
}
app.get("/api/getCode/",onGetCode);
async function onGetCode(req,res) {
    let cursor = null;
    let cnt = 0;
    let tmp = {};
    tmp = await db.collection("codeTable").findOne();
    // while (await cursor.hasNext()) {
    //     const result = await cursor.next();
    //     console.log(result);
    //     res
    //     tmp[cnt++] = result;
    // }
    res.json(tmp);
}
// app.post("/api/getData/:name",onPost);
