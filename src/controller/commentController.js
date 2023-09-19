const http = require('http');

const getComments = (req, res) => {
  http.get('http://jsonplaceholder.typicode.com/comments', (resp) => {
    let data = '';

    resp.on('data', (datas) => {
      data += datas;
    });

    resp.on('end', () => {
      try {
        const rawData = JSON.parse(data);

        const dataBody = rawData.map((comment) => ({
          postId: comment.postId,
          name: comment.name,
          email: comment.email,
          content: comment.body,
        }));

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(dataBody));
      } catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
    });
  });
};

module.exports = getComments;
