const getPost = require('../controller/postController');
const getComments = require('../controller/commentController');
const getPostsAndComments = require('../controller/commentPostController');

const router = {};
router.init = (req, res) => {
  if (req.url === '/api/post/get') {
    getPost(req, res);
  } else if (req.url === '/api/comment/get') {
    getComments(req, res);
  } else if (req.url === '/api/post-comment/get') {
    getPostsAndComments(req, res);
  } else {
    res.end('Not Found Route !');
  }
};

module.exports = router;
