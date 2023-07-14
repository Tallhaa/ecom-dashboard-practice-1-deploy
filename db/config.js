const mongoose = require('mongoose');

require('dotenv').config();

main().catch((err) => console.log(err));
async function main() {
    mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.0pswmcu.mongodb.net/ecom-dashboard-practice-1`);
    console.log("Database Connected Successfully")
}