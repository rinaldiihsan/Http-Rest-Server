const http = require('http');

const getPostsAndComments = (req, res) => {
  http.get('http://jsonplaceholder.typicode.com/posts', (postResponse) => {
    let postData = '';

    postResponse.on('data', (datas) => {
      postData += datas;
    });

    postResponse.on('end', () => {
      http.get('http://jsonplaceholder.typicode.com/comments', (commentResponse) => {
        let commentData = '';

        commentResponse.on('data', (datas) => {
          commentData += datas;
        });

        commentResponse.on('end', () => {
          try {
            const posts = JSON.parse(postData);
            const comments = JSON.parse(commentData);

            const combinedData = posts.map((post) => {
              const postComments = comments.filter((comment) => comment.postId === post.id);
              return {
                id: post.id,
                judulPost: post.title,
                contentPost: post.body,
                comments: postComments.map((comment) => ({
                  postId: comment.postId,
                  namaUser: comment.name,
                  emailUser: comment.email,
                  contentComment: comment.body,
                })),
              };
            });

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(combinedData));
          } catch (error) {
            console.error(error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
          }
        });
      });
    });
  });
};

module.exports = getPostsAndComments;
