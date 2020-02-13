const express = require("express");

const server = express();

server.use(express.json());

const projects = [];
let contRequests = 0;

// Middleware global que conta a quantidade de requisições
server.use((req, res, next) => {
  contRequests++;

  console.log(`Quantidade de requisições feitas: ${contRequests}`);

  return next();
});

// Middleware local que verifica se o id do projeto existe
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(pjt => pjt.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project not found" });
  }

  return next();
}

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
server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(pjt => pjt.id == id);

  project.title = title;

  return res.json(projects);
});

// Deleta o projeto
server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(pjt => pjt.id == id);

  projects.splice(index, 1);

  return res.json(projects);
});

// Armazena tarefas
server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(pjt => pjt.id == id);

  project.tasks.push(title);

  return res.json(projects);
});

server.listen(3000);
