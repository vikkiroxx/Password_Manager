const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const cors = require("cors");
const PORT = 3001;

const { encrypt, decrypt } = require("./EncryptionHandler")

app.use(cors());
app.use(express.json());

const url = 'mongodb://localhost:27017';
const dbName = 'Password-Manager';

const client = new MongoClient(url);

async function dbConnect(){
    let result = await client.connect();
    let db = result.db(dbName);
    return db.collection('Passwords'); 
}

app.post('/addpassword', async (req, resp)=>{
    const {password, title}= req.body;
    const hashedPassword = encrypt(password);

    try {
        const passwordsCollection = await dbConnect();
        const result = await passwordsCollection.insertOne({ 
            title,
            password: hashedPassword.password,
            iv: hashedPassword.iv 
        });
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        resp.send("Success");
    } catch (err) {
        console.error(err);
        resp.status(500).send("Error adding password");
    }
});

app.get('/showpasswords', async (req, resp)=>{
    try{
        const passwordsCollection = await dbConnect();
        const data = await passwordsCollection.find().toArray();
        resp.send(data);
    }catch(err){
        console.error(err);
        resp.status(500), send("Error retrieving password");
    }
});

app.post('/decryptPassword', (req, resp)=>{
    try {
        const decryptedData = decrypt(req.body);
        console.log('Decrypted data:', decryptedData);
        resp.send(decryptedData);
    } catch (err) {
        console.error('Error decrypting:', err);
        resp.status(500).send("Error during decryption");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


