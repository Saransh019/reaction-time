// const express = require("express");
// const app = express();
// const path = require("path");
// const bodyParser = require("body-parser");
// const fs = require("fs");
// const csv = require("csv-parser");

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://saransh1906:mongo%40123@reactiontime.lqhvjwy.mongodb.net/?retryWrites=true&w=majority&appName=reactiontime";
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//     const client = new MongoClient(uri, {
//       serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//       },
//     });
  
//     try {
//       await client.connect();
//       console.log(
//         "Connected to MongoDB. You successfully connected to MongoDB!"
//       );
      
//       // Call the insertData function after connecting to MongoDB
//       app.post("/submitData", (req, res) => {
//         const receivedData = req.body;
//         console.log("Received data:", receivedData);
//         insertData(client, receivedData);
//         res.sendStatus(200);
//       });
  
//     } catch (error) {
//       console.error("Error connecting to MongoDB:", error);
//     } finally {
//       // Don't close the client here, keep the connection open until the server shuts down
//     }
//   }
  
//   async function insertData(client, receivedData) {
//     const database = client.db("reaction-time-data"); 
//     const collection = database.collection("reaction-time-table");
  
//     const data = {
//       name: receivedData.name,
//       gender: receivedData.gender,
//       reactionTime: receivedData.reactionTime,
//     };
  
//     try {
//       const result = await collection.insertOne(data);
//       console.log("Inserted document with _id:", result.insertedId);
//     } catch (error) {
//       console.error("Error inserting document:", error);
//     }
//   }
  
//   const port = process.env.PORT || 3000;
  
//   run().then(() => {
//     app.listen(port, () => {
//       console.log(`Server is running on http://localhost:${port}`);
//     });
//   }).catch(console.error);


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB URI
const uri =
  "mongodb+srv://vercel-admin-user:DhfrRFug5a0yIj7Z@reactiontime.lqhvjwy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Function to insert data into MongoDB
async function insertData(client, receivedData) {
  const database = client.db("reaction-time-data"); 
  const collection = database.collection("reaction-time-table");

  const data = {
    name: receivedData.name,
    gender: receivedData.gender,
    reactionTime: receivedData.reactionTime,
  };

  try {
    const result = await collection.insertOne(data);
    console.log("Inserted document with _id:", result.insertedId);
  } catch (error) {
    console.error("Error inserting document:", error);
  }
}

// Connect to MongoDB and start server
async function run() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    console.log(
      "Connected to MongoDB. You successfully connected to MongoDB!"
    );
    
    // Route to handle POST requests to submit data
    app.post("/submitData", (req, res) => {
      const receivedData = req.body;
      console.log("Received data:", receivedData);
      insertData(client, receivedData);
      res.sendStatus(200);
    });

    // Route to handle GET requests at the root URL
    app.get("/", (req, res) => {
      res.send("Hello World!"); // You can customize the response as needed
    });

    // Start the Express server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.error);
