const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    mongoURI: 'mongodb+srv://mahiman:Test@1234@cluster0-p69lf.mongodb.net/Eshop?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
}