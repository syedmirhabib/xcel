const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);

// middleware
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

// Verify JWT TOken ----

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "unauthorized access" });
  }
  // bearer token
  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { default: Stripe } = require("stripe");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@learndb.isqzetk.mongodb.net/?retryWrites=true&w=majority`;

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mq0mae1.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const classCollection = client.db("danceSchoolDB").collection("classes");
    const instructorClassCollection = client.db("danceSchoolDB").collection("instructorClasses");
    const userCollection = client.db("danceSchoolDB").collection("users");
    const paymentCollection = client.db("danceSchoolDB").collection("payments");
    const instructorCollection = client.db("danceSchoolDB").collection("instructors");
    const cartCollection = client.db("danceSchoolDB").collection("carts");

// jwt token 
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      res.send({ token });
    });



    // verify admin 
    // Warning: use verifyJWT before using verifyAdmin
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      if (user?.role !== "admin") {
        return res
          .status(403)
          .send({ error: true, message: "forbidden message" });
      }
      next();
    };

// verify Instructor  ---
const verifyInstructor = async (req, res, next) => {
  const email = req.decoded.email;
  const query = { email: email };
  const user = await userCollection.findOne(query);
  if (user?.role !== "instructor") {
    return res
      .status(403)
      .send({ error: true, message: "forbidden message" });
  }
  next();
};


    // classes access by it
    app.get("/classes", async (req, res) => {
      const result = await classCollection
        .find()
        .sort({ currentStudent: -1 })
        .toArray();
      res.send(result);
    });

    // get the users
    // Save user email and role in DB
    app.put("/users/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const query = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };
      const result = await userCollection.updateOne(query, updateDoc, options);
      console.log(result);
      res.send(result);
    });

    // get user data
    app.get("/users",verifyJWT,verifyAdmin, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    // check admin or not by jwt 
    app.get('/users/admin/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        res.send({ admin: false })
      }
      const query = { email: email }
      const user = await userCollection.findOne(query);
      const result = { admin: user?.role === 'admin' }
      res.send(result);
    })


    // make admin
    app.patch("/users/admin/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: "admin",
        },
      };

      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // instructors collections --get it
    app.get("/instructors", async (req, res) => {
      const role = 'instructor';
    
      const result = await userCollection.find({ role }).toArray();
    
      res.send(result);
    });
    // carts operation --

    app.get("/carts", verifyJWT, async (req, res) => {
      const email = req.query.email;
      console.log(email);
      if (!email) {
        res.send([]);
      }
    
      const decodedEmail = req.decoded.email;
      if (email !== decodedEmail) {
        return res.status(403).send({ error: true, message: "forbidden access" });
      }
    
      const query = { email: email };
      const result = await cartCollection.find(query).toArray();
    
      const updatedResult = result.map((item) => {
        return { id: item._id, ...item };
      });
    
      res.send(updatedResult);
    });
    



// original get 


    // app.get("/carts", verifyJWT, async (req, res) => {
    //   const email = req.query.email;
    //   console.log(email);
    //   if (!email) {
    //     res.send([]);
    //   }

    //   const decodedEmail = req.decoded.email;
    //   if (email !== decodedEmail) {
    //     return res
    //       .status(403)
    //       .send({ error: true, message: "forbidden access" });
    //   }

    //   const query = { email: email };
    //   const result = await cartCollection.find(query).toArray();
    //   res.send(result);
    // });





















    // post a new item to cart
    app.post("/carts", async (req, res) => {
      const item = req.body;
      const userEmail = item.email;
    
      // Check if the item already exists in the cart for the user's email
      const existingItem = await cartCollection.findOne({ itemId: item.itemId, email: userEmail });
      if (existingItem) {
        return res.status(400).json({ error: "Item already exists in the cart." });
      }
    
      // Add the item to the cart
      const result = await cartCollection.insertOne(item);
      res.send(result);
    });
    



    // card payment ---
      // create payment intent
    app.post("/create-payment-intent",verifyJWT,async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      console.log(price,amount);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });


      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    // --------------------------------Instructor ar kaj baj ---------------------------

    app.post("/instructorClasses", async (req, res) => {
      const item = req.body;
      const result = await classCollection.insertOne(item);  
      // use classCollection 
      res.send(result);
    });

    
    app.get("/instructorClasses", async (req, res) => {
      const result = await classCollection.find().toArray();
      res.send(result);
    });
// approved-----------------------------------------
    app.patch("/instructorClasses/statusApproved/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: "approved",
        },
      };

      const result = await classCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    //  rejected ---- -------------------------
    app.patch("/instructorClasses/statusRejected/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: "rejected",
        },
      };

      const result = await classCollection.updateOne(filter, updateDoc);
      res.send(result);
    });


// update by its modal 

app.patch('/instructorClasses/:id', async (req, res) => {
  const { id } = req.params; // Get the _id parameter from the request URL
  const { reason } = req.body; // Assuming the client sends the updated reason in the request body

  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: { reason }
  };

  try {
    const result = await classCollection.updateOne(filter, updateDoc);
    res.json(result); // Send the result of the update operation as the response
  } catch (error) {
    console.error('Error updating class:', error);
    res.status(500).send('An error occurred while updating the class.');
  }
});



    // app.patch('/instructorClasses/statusRejected/:id', (req, res) => {
    //   const { id } = req.params;
    //   const { reason } = req.body;
    
    //   // Assuming you have a MongoDB model for the instructor classes
    //   InstructorClass.findByIdAndUpdate(
    //     id,
    //     { $set: { status: 'rejected', rejectReason: reason } },
    //     { new: true }
    //   )
    //     .then((updatedClass) => {
    //       res.json({ modifiedCount: 1, updatedClass });
    //     })
    //     .catch((error) => {
    //       res.status(500).json({ error: 'Failed to update class status' });
    //     });
    // });
  











    

    app.get('/myclass', async (req, res) => {
      const email = req.query.email; // Use req.query instead of req.body for GET requests
      const query = { email: email };
      const result = await classCollection.find(query).toArray();
      res.send(result);
    });

    // ----------make instructor ------------ from a normal user: only admin can make it------------------
    // 1* 1stly patch user and make him Instructor 
    // 2- then get the instructor 

    app.get("/users/instructor/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        res.send({ instructor: false });
      }

      const query = { email: email };
      const user = await userCollection.findOne(query);
      const result = { instructor: user?.role === "instructor" };
      res.send(result);
    });


    app.patch("/users/instructor/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: "instructor",
        },
      };

      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result);
    });


    
    // payment related api
    app.post("/payments", verifyJWT, async (req, res) => {
      const payment = req.body;
      const insertResult = await paymentCollection.insertOne(payment);
    
      const query = {
        _id: { $in: payment.cartItems.map((id) => new ObjectId(id)) },
      };
      const deleteResult = await cartCollection.deleteOne(query);

      res.send({ insertResult, deleteResult });
    });

    app.get('/payments', async (req, res) => {
      const email = req.query.email; // Use req.query instead of req.body for GET requests
      const query = { email: email };
      const result = await paymentCollection.find(query).toArray();
      res.send(result);
    });

    // delete an item
    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("DesignXcel Server is running..");
});

app.listen(port, () => {
  console.log(`DesignXcel Server is running on port ${port}`);
});
