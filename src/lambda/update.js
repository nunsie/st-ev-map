// example of async handler using async-await
// https://github.com/netlify/netlify-lambda/issues/43#issuecomment-444618311

import fetch from 'node-fetch'

import { MongoClient } from 'mongodb'

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

    const { access_token, ipinfo } = JSON.parse(event.body)
    console.log(access_token, ipinfo)
    const userResponse = await fetch("https://discordapp.com/api/users/@me", { headers: { Authorization: "Bearer " + access_token } })
    if (!userResponse.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: userResponse.status, body: userResponse.statusText }
    }
    let user = await userResponse.json()

    const guildsResponse = await fetch("https://discordapp.com/api/users/@me/guilds", { headers: { Authorization: "Bearer " + access_token } })
    if (!guildsResponse.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: guildsResponse.status, body: guildsResponse.statusText }
    }
    let guilds = await guildsResponse.json()

    guilds.filter(guild => guild.id === '567477797577293855')
    if (guilds.length === 0) {
      throw new Error('You are not a member of the EV Satoshi\'s Treasure Clan discord');
    }

    user.location = {
      lat: ipinfo.loc.split(',')[0],
      lon: ipinfo.loc.split(',')[1],
    }

    // save details to fauna then query all records and return them
    const member = await db.collection('members').updateOne({id:user.id}, {$set: user}, { upsert: true });

    // const members = await db.collection('members').find().toArray();

    // close the connection
    // client.close();

    return {
      statusCode: 200,
      body: JSON.stringify(member)
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