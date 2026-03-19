const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;

let postRoutes = express.Router();

// #1 Retrieve all posts
postRoutes.route("/posts").get(async (request, response) => {
  let db = database.getDb();
  let data = await db.collection("posts").find({}).toArray();
  if (data.length > 0) {
    response.json(data);
  } else {
    throw new Error("No posts found");
  }
});

// #2 Retrieve a single post by ID
postRoutes.route("/posts/:id").get(async (request, response) => {
  let db = database.getDb();
  let data = await db.collection("posts").findOne({ _id: new ObjectId(request.params.id) });
  if (Object.keys(data).length > 0) {
    response.json(data);
  } else {
    throw new Error("No posts found");
  }
});

// #3 Create a new post
postRoutes.route("/posts/:id").post(async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    title: request.body.title,
    description: request.body.description,
    content: request.body.content,
    author: request.body.author,
    dateCreated: request.body.dateCreated,
  }
  let data = await db.collection("posts").insertOne(mongoObject)
  if (Object.keys(data).length > 0) {
    response.json(data);
  } else {
    throw new Error("No posts found");
  }
});
// #4 Update an existing post
// #5 Delete a post
