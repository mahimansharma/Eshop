// const config = require('./config');
const express = require ('express');
const cors = require('cors');
const path = require("path");
const parser = require ('body-parser');
const app = express();
const { Products} = require('./models/products');
// const {auth} = require('./middleware/auth');

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://mahiman:Stillalive@cluster0-p69lf.mongodb.net/Eshop?retryWrites=true&w=majority";
const config = require('./config/key')

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { json } = require('body-parser');

const mongoose = require ('mongoose');

mongoose.connect(config.mongoURI,
    {
        useNewUrlParser: true, useUnifiedTopology: true,
        useCreateIndex: true, useFindAndModify: false
    })
        .then(() => console.log('DB connected'))
        .catch(err => console.error(err));


app.use(cors());
app.use(parser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use('/api/users', require('./routes/users'));
app.use('/api/users2', require('./routes/userRoutes'));

app.use('',require('./routes/products'));




// _________________________________________________________________________________________________________//

// app.get("/mobiles", (req, res) => {
//     const client = new MongoClient(uri, { useNewUrlParser: true });
//     client.connect(err => {
//         const collection = client.db("Eshop").collection("mobiles");
//         collection.find().toArray((error, data) => {
//             console.log("Got data");
//             client.close();
//             if (error) {
//                 console.log("error", error)
//                 res.status(500).json({ data: "not found" })
//             }
//             else {
//                 res.json({ data: data })

//             }

//         });

//     });
// })



// _______________________________________________________________________________________________________//
app.use(express.static("../frontend/build"));

app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});
const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`server running at port ${port}`)
});