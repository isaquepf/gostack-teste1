const express = require('express');
const cors = require('cors');
const { uuid } = require('uuidv4');
const app = express();
const Repository = require('./model/repository');

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
  return response.json(repositories)
})

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body;
  const repository = new Repository(uuid(), title, url, techs);
  repositories.push(repository);
  return response.json(repository);
})

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  let _index;
  let repository = repositories.filter((item, index) => { _index = index; return item.id === id })[0];

  if(!repository) 
    return response.sendStatus(400);

  const { url, title, techs } = request.body;
  repository.url = url;
  repository.title = title;
  repository.techs = techs;

  repositories[_index] = repository;

  return response.status(200).json(repository);
})

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params;
  let _index;
  let repository = repositories.filter((item, index) => { _index = index; return item.id === id })[0];

  if(!repository) 
    return response.sendStatus(400);

  repositories.splice(_index, 1);
  return response.sendStatus(204);
})


app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params;
  let _index;
  let repository = repositories.filter((item, index) => { _index = index; return item.id === id })[0];
  if(!repository) 
    return response.sendStatus(400);

  repository.liked();
  repositories[_index] = repository;

  return response.status(200).json(repository);
})

module.exports = app;
