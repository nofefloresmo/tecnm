const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect(
            "mongodb://mongo01:27017,mongo02:27017,mongo03:27017/tecnm?replicaSet=replica01"
        );
        console.log("Connected to MongoDB ReplicaSet");
    } catch (error) {
        console.error("Error connecting to MongoDB ReplicaSet", error);
    }
}

module.exports = { connect };