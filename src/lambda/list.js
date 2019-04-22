// example of async handler using async-await
// https://github.com/netlify/netlify-lambda/issues/43#issuecomment-444618311

import fetch from 'node-fetch'

import { MongoClient } from 'mongodb'

// server
// 8Pgd9vzP3KGQINhJ

// Database Name
const dbName = 'toshi';
// Connection URL
const uri = `mongodb+srv://server:${process.env.MONGO_PASS}@st-ev-members-eceh4.mongodb.net/test?retryWrites=true`;
// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true });

export async function handler(event, context) {
  try {

    // Use connect method to connect to the Server
    await client.connect()
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    console.log(event.body)
    const members = await db.collection('members').find().toArray();

    // close the connection
    // client.close();

    return {
      statusCode: 200,
      body: JSON.stringify(members)
    }
  } catch (err) {

    // close the connection
    // client.close();

    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}