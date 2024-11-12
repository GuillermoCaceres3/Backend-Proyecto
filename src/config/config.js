import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({path: '.env.test'});
} else{
    dotenv.config();
}

export const config = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
}
