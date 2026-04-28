const express = require('express');
const router = express.Router();

// in-memory data
let posts = [
  { id: 1, title: "Hello", content: "Test post" }
];

// ======================
// GET ALL POSTS
// ======================
router.get('/', (req, res) => {
  res.json(posts);
});

// ======================
// CREATE POST
// ======================
router.post('/', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content required" });
  }

  const newPost = {
    id: Date.now(),
    title,
    content
  };

  posts.push(newPost);

  res.status(201).json(newPost);
});

// ======================
// DELETE POST
// ======================
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = posts.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  const deleted = posts.splice(index, 1);

  res.json({
    message: "Post deleted successfully",
    post: deleted[0]
  });
});

// ======================
// UPDATE POST
// ======================
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;

  res.json(post);
});

module.exports = router;