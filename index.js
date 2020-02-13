const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

// Cadastra um novo projeto
server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
});

// Lista todos os projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

// Edita o títilo do projeto
server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(pjt => pjt.id == id);

  project.title = title;

  return res.json(projects);
});

// Deleta o projeto
server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(pjt => pjt.id == id);

  projects.splice(index, 1);

  return res.json(projects);
});

// Armazena tarefas
server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(pjt => pjt.id == id);

  project.tasks.push(title);

  return res.json(projects);
});

server.listen(3000);
