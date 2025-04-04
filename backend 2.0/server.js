// server.js
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

// ------------------------------
// Middleware
// ------------------------------
app.use(cors())
app.use(bodyParser.json())

// ------------------------------
// Connect to MongoDB Atlas
// ------------------------------
const mongoURI =
  'mongodb+srv://anishmaniyar4:j3VTGOcws2GY7UAe@cityverse.41tma.mongodb.net/?retryWrites=true&w=majority&appName=cityverse'
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err))

// ------------------------------
// Mongoose Schemas and Models
// ------------------------------

// Minimal Post Schema (only title, content, author and vote fields)
const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    name: { type: String, default: "Unknown" },
    username: { type: String, default: "unknown" },
    avatar: { type: String, default: "/placeholder.svg" },
    joinedDate: { type: String, default: "Member since unknown" },
  },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  votes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})
const Post = mongoose.model('Post', PostSchema)

// Optional: Comment Schema and Model (unchanged)
const CommentSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    name: { type: String, required: true },
    username: { type: String, required: true },
    avatar: { type: String, default: "/placeholder.svg" },
    isOfficial: { type: Boolean, default: false },
  },
  time: { type: String, default: "Just now" },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  replies: [
    {
      content: String,
      author: {
        name: String,
        username: String,
        avatar: { type: String, default: "/placeholder.svg" },
        isOfficial: { type: Boolean, default: false },
      },
      time: String,
      upvotes: { type: Number, default: 0 },
      downvotes: { type: Number, default: 0 },
    },
  ],
  createdAt: { type: Date, default: Date.now },
})
const Comment = mongoose.model('Comment', CommentSchema)

// ------------------------------
// Endpoints for Posts
// ------------------------------

// GET all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 })
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET a single post by ID
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ error: "Post not found" })
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST a new post (requires only title and content; author is optional)
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, author } = req.body
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" })
    }
    // Use provided author data if available; otherwise default to unknown
    const postAuthor =
      author && author.username && author.name
        ? author
        : { username: "unknown", name: "Unknown", avatar: "/placeholder.svg", joinedDate: "Member since unknown" }

    const newPost = new Post({
      title,
      content,
      author: postAuthor
    })
    const savedPost = await newPost.save()
    res.json(savedPost)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT endpoint for upvoting a post
app.put('/api/posts/:id/upvote', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ error: "Post not found" })
    post.upvotes += 1
    post.votes += 1
    const updatedPost = await post.save()
    res.json(updatedPost)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT endpoint for downvoting a post
app.put('/api/posts/:id/downvote', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ error: "Post not found" })
    post.downvotes += 1
    post.votes -= 1
    const updatedPost = await post.save()
    res.json(updatedPost)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ------------------------------
// Endpoints for Comments (Optional)
// ------------------------------
app.get('/api/comments', async (req, res) => {
  try {
    const { postId } = req.query
    if (!postId) {
      return res.status(400).json({ error: "postId query parameter is required" })
    }
    const comments = await Comment.find({ postId }).sort({ createdAt: 1 })
    res.json(comments)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/comments', async (req, res) => {
  try {
    const { postId, content, author } = req.body
    if (!postId || !content || !author) {
      return res.status(400).json({ error: "postId, content and author are required" })
    }
    const newComment = new Comment({
      postId,
      content,
      author
    })
    const savedComment = await newComment.save()
    res.json(savedComment)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ------------------------------
// Start the Server
// ------------------------------
const PORT = process.env.PORT || 3069
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
