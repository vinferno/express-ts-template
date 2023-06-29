import express from "express";
import cors from "cors";
import path from 'path';
import fs  from 'fs';
const __dirname = path.resolve();
console.log(__dirname);
const port = 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', function(req, res) {
  res.json({test: 'test'})
});
app.get('/todos', function(req, res) {
  res.sendFile(path.join(__dirname, 'todos.json'));
});

app.post('/todos', function(req, res) {
  console.log('posted', req.body);

  const todos = JSON.parse(fs.readFileSync(path.join(__dirname, 'todos.json'), 'utf8'));

  todos.push(req.body);
  fs.writeFileSync(path.join(__dirname, 'todos.json'), JSON.stringify(todos))

  res.sendFile(path.join(__dirname, 'todos.json'));
});

app.listen(port, function() {
  console.log(`running on http://localhost:${port}`)
}) 


