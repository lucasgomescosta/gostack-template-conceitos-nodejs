const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const likes = 0;

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = {"id": uuid(), title, url, techs, likes}
  repositories.push(repositorie);

  response.status(201).json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const rep = repositories.find(repositorie => repositorie.id === id);

  if(!rep){
    return response.status(400).json({ error: 'repositorie not found!'})
  }

  rep.id = id;
  rep.title = title;
  rep.url = url;
  rep.techs = techs;
  rep.likes = rep.likes;

    
  return response.json(rep); 
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repIndex < 0){
    return response.status(400).json({ error: 'repositorie not found!'})
  }

  repositories.splice(repIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const rep = repositories.find(repositorie => repositorie.id === id);

  if(!rep){
    return response.status(400).json({ error: 'repositorie not found!'})
  }

  rep.likes = rep.likes + 1;

  response.status(201).json(rep);
});

module.exports = app;
