const { MongoClient } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/Shopping', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server')
    
    db.dropDatabase((err, result) => {  
        console.dir('we dropped the database ');
    });
    
    db.close()
})