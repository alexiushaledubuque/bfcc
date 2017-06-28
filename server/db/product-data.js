const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/Shopping', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server')
    
    // recreate a new collection with unique data
    db.collection('products').insertMany([
        {   imagePath: 'https://thumb.ibb.co/iiqPVv/drone1.jpg',
            title: 'GPX - Sky Rider Eagle Pro Drone with Remote Controller',
            description: 'Auto return mode and Headless mode flying option; FPV real time camera; 6 axis gyro; flying range up to 260 ft; 2.4GHz transmitter; multidirectional controls; 3 speeds',
            price: 100
        },{
            imagePath: 'https://thumb.ibb.co/kVuUFv/drone2.jpg',
            title: 'GPX - Sky Rider Condor Pro Drone with Remote Controller - Black',
            description: 'Altitude hold mode and Headless mode flying option; FPV real time camera; 6 axis gyro; flying range up to 300 ft; 2.4GHz transmitter; multidirectional controls; 3 speeds',
            price: 115
        },{
            imagePath: 'https://thumb.ibb.co/kVuUFv/drone2.jpg',
            title: 'WebRC - XDrone HD Quadcopter - Red/Black',
            description: 'Multi-rotor technology and auto-stabilizing sensors; HD video; 1GB storage; 150ft operating range; multidirectional controls',
            price: 80
        }, {
            imagePath: 'https://thumb.ibb.co/hkNGvv/drone3.jpg',
            title: 'Sharper Image - DX-4 Drone with Remote Controller - Black/Yellow',
            description: '6-axis gyroscope; multidirectional controls; stream live video; flying range up to 450 ft; 2.4 GHz remote control',
            price: 100
        },{
            imagePath: 'https://thumb.ibb.co/c1VrTF/drone4.jpg',
            title: 'WebRC - XDrone Pro 2 Remote-Controlled Quadcopter - Red',
            description: 'XDrone Pro 2 Remote-Controlled Quadcopter: built-in HD video camera; 6-axis gyroscope; 2.4Ghz remote control; indoor or outdoor; flips & tricks',
            price: 90
        }
    ], (err, result) => {
        if (err) {
            return console.log('Unable to insert products into Products: ', err)
        } else {
            return console.log('Shopping database recreated successfully: ', result)
        }
    })
     db.close()
})