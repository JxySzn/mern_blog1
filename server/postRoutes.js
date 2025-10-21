const express = require("express");
const database = require("./connect");

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
  let data = await db.collection("posts").findOne({ _id: request.params.id });
  if (data.length > 0) {
    response.json(data);
  } else {
    throw new Error("No posts found");
  }
});
// #3 Create a new post
// #4 Update an existing post
// #5 Delete a post
