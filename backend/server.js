const jsonServer = require('json-server');
const path = require('path'); // ← ye add karo

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json')); // ← correct path
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom routes
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}));

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});
