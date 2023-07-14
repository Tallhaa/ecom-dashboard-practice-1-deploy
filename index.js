const express = require('express');
const cors = require('cors')
require('./db/config')
const User = require("./models/User");
const Product = require('./models/Products')
const path = require('path')
const app = express();
require('dotenv').config()

app.use(express.json())
app.use(cors());

app.use(express.static(path.join(__dirname, "./front-end/build")));
app.get("*", (req, resp) => {
    resp.sendFile(path.join(__dirname, "./front-end/build/index.html"))
})

app.post("/register", async (req, resp) => {
    let result = await User.findOne({ email: req.body.email })
    if (result) {
        resp.send({ "result": "Email Exist" })
    }
    else {
        let result = await new User(req.body);
        result = await result.save()
        result = result.toObject();
        delete result.password;
        resp.send(result)
    }
});

app.post("/login", async (req, resp) => {
    if (req.body.email && req.body.password) {
        let result = await User.findOne(req.body).select("-password")
        if (result) {
            resp.send(result);
        } else {
            resp.send({ result: "No User Found" });
        }
    }
    else {
        resp.send({ "result": "Enter correct details" })
    }

})

app.post("/add-product", async (req, resp) => {
    let result = await new Product(req.body);
    result = await result.save()
    resp.send(result)
})

app.get("/products", async (req, resp) => {
    let result = await Product.find({})
    resp.send(result)
})

app.get("/product/:id", async (req, resp) => {
    try {
        let result = await Product.findOne({ _id: req.params.id });
        if (result) {
            resp.send(result)
        }
        else {
            resp.send({ result: "No data" })
        }

    } catch (error) {
        resp.send({ message: error });
    }

})

app.put("/product/:id", async (req, resp) => {
    let result = await Product.updateOne({ _id: req.params.id }, req.body);

    resp.send(result);
});

app.delete("/product/:id", async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id })
    resp.send(result)
});

app.get("/search/:key", async (req, resp) => {
    try {
        let result = await Product.find({
            "$or": [
                { name: { $regex: req.params.key, $options: "i" } },
                { price: { $regex: req.params.key, $options: "i" } },
                { company: { $regex: req.params.key, $options: "i" } },
                { category: { $regex: req.params.key, $options: "i" } },

            ]
        });
        if (result.length > 0) {
            resp.send(result)
        }
        else {
            resp.send({ "result": "No Data Found" })
        }
    } catch (error) {
        resp.send({ "error": error })
    }
})

const PORT = process.env.PORT;

app.listen(PORT, () =>
    console.log(`app running on ${process.env.PORT}`)
);