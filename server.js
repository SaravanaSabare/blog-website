const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/blogDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Define Blog schema
const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model('Blog', blogSchema);

// Routes
app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching blogs' });
    }
});

app.post('/blogs', async (req, res) => {
    const { title, content } = req.body;
    const blog = new Blog({ title, content });

    try {
        await blog.save();
        res.status(201).json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Error saving blog' });
    }
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
