const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const axios = require('axios');
const User = require('./models/User');
const Usage = require('./models/Usage');
const Billing = require('./models/Billing');
require('dotenv').config();

const app = express();
app.use(express.json()); // ✅ Body parser middleware

// MongoDB Connection
const DB_URI = 'mongodb://localhost:27017/tensorgo';
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// CORS Config
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Session Config
app.use(session({
    secret: 'tensorgo',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// Passport Config
app.use(passport.initialize());
app.use(passport.session());

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback'
}, (token, tokenSecret, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Google OAuth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('http://localhost:3000/dashboard');
});

// API - Usage
app.get('/api/usage', (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'User not authenticated' });

    Usage.findOne({ userId: req.user.id }, (err, usage) => {
        if (err) return res.status(500).json({ error: 'Error fetching usage data' });
        if (!usage) return res.status(404).json({ error: 'No usage data found' });

        res.json(usage);
    });
});

// API - Billing
app.get('/api/billing', (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'User not authenticated' });

    Billing.findOne({ userId: req.user.id }, (err, billing) => {
        if (err) return res.status(500).json({ error: 'Error fetching billing data' });
        if (!billing) return res.status(404).json({ error: 'No billing data found' });

        res.json(billing);
    });
});

// ✅ Zapier Invoice Endpoint (dynamic data from frontend)
app.post('/api/invoice', passport.authenticate('session'), (req, res) => {
    const zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/22569866/2xmzdgf/';

    const {
        recipient_email,
        recipient_name,
        totalUsage,
        billingCycle
    } = req.body;

    const userId = req.user ? req.user.id : 'guest-user';

    const invoiceData = {
        userId,
        totalUsage,
        billingCycle,
        invoiceDate: new Date().toISOString(),
        recipient_email,
        recipient_name
    };

    axios.post(zapierWebhookUrl, invoiceData)
        .then(response => {
            console.log('Invoice sent to Zapier successfully');
            res.json({ success: true, invoiceId: response.data.id || 'mock-id' });
        })
        .catch(error => {
            console.error('Error sending invoice to Zapier:', error.message);
            res.status(500).json({ error: 'Invoice generation failed' });
        });
});

// Start Server
app.listen(5000, () => console.log('Backend server running on http://localhost:5000'));
