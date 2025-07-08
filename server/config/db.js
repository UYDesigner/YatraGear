const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)

        console.log("mongoDB connected....")

    } catch (error) {
        console.log("db connection failed :", error)
        process.exit(1);
    }
}

module.exports = connectDB;