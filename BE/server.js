import express from 'express'; 
import {connectToDB} from './config/db.js';
import dotenv from 'dotenv';
import User from './models/user.model.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config(); // Load environment variables from .env file

const app = express(); 

const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use(cors({
    origin: process.env.CLIENT_URL, // Allow requests from the client URL
    credentials: true, // Allow cookies to be sent with requests
}));

app.get('/', (req, res) => {
    res.send('Hello World'); 
})

app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;
    
    try{
        if (!username || !email || !password) {
            throw new Error('All fields are required');
        }
        
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const usernameExists = await User.findOne({ email });
        if (usernameExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const userDoc = await User.create({
            username, 
            email,
            password: hashedPassword,
        });

        //JSON Web Token (JWT) 
        if(userDoc){
            const tokem = jwt.sign({id: userDoc._id}, process.env.JWT_SECRET, {expiresIn: '7d'}); //jwt.sign(payload, secret, options)
            
            res.cookie('token', tokem, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                sameSite: 'strict', // Helps prevent CSRF attacks
            });
        }
        
        return res.status(200).json({user: userDoc, message: 'User created successfully'});
    }   catch(error){
            res.status(400).json({message: error.message});
    }
    
});

app.post('/api/signin', async (req, res) => {
    const { username, password } = req.body;
    try{
        const userDoc = await User.findOne({ username });
        if (!userDoc) {
            return res.status(400).json({ message: 'Invalid username or password' });
        } 

        const isPasswordValid = await bcrypt.compare(password, userDoc.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        //JSON Web Token (JWT) 
        if(userDoc){
            const tokem = jwt.sign({id: userDoc._id}, process.env.JWT_SECRET, {expiresIn: '7d'}); //jwt.sign(payload, secret, options)
            
            res.cookie('token', tokem, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                sameSite: 'strict', // Helps prevent CSRF attacks
            });
        }
        
        return res.status(200).json({user: userDoc, message: 'Logged in successfully'});
    } catch(error){
        res.status(400).json({message: error.message});
    }
});

app.get('/api/fetch-user', async (req, res) => {
    const { token } = req.cookies; // Get the token from cookies
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({ message: 'Invalid token' });
        }

        const userDoc = await User.findById(decoded.id).select('-password'); // Exclude password from the response
        if (!userDoc) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user: userDoc });
    } catch (error) {
        console.log('Error fetching user:', error.message);
        return res.status(400).json({ message: error.message});
    }
});

app.post('/api/signout', (req, res) => {
    res.clearCookie('token'); // Clear the token cookie
    res.status(200).json({ message: 'Signed out successfully' });
});


app.listen(PORT, () => {
    connectToDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});