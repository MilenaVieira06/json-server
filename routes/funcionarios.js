const express = require("express");
const router = express.Router();
const { v4 } = require("uuid");
const fs = require("fs");

const readFile = () => {
  content = fs.readFileSync("./database/db.json", "utf-8");
  return JSON.parse(content);
};
const writeFile = (content) => {
  const updateFile = JSON.stringify(content);
  fs.writeFileSync("./database/db.json", updateFile, "utf-8");
};

router.get("/funcionarios", (req, res) => {
  const content = readFile();
  res.json(content[0]);
});

router.get("/funcionarios/:id", (req, res) => {
  const { id } = req.params;
  const content = readFile();
  const func = content[0].find((func) => func.id == id);
  res.json(func);
});

router.post("/funcionarios/add", (req, res) => {
  const { nome, sobrenome, sexo, telefone, cargo } = req.body;
  const id = v4();

  currentContent = readFile();
  currentContent[0].push({ nome, sobrenome, sexo, telefone, cargo, id });
  writeFile(currentContent);
  res.status(201).json({ nome, sobrenome, sexo, telefone, cargo, id });
});

router.put("/funcionarios/att/:id", (req, res) => {
  const { id } = req.params;

  const { nome, sobrenome, sexo, telefone, cargo } = req.body;

  const currentContent = readFile();
  const funcIndex = currentContent[0].findIndex((func) => func.id == id);

  const {
    nome: cNome,
    sobrenome: cSobrenome,
    sexo: cSexo,
    telefone: cTelefone,
    cargo: cCargo,
    id: cId,
  } = currentContent[0][funcIndex];

  const updateFunc = {
    nome: nome ? nome : cNome,
    sobrenome: sobrenome ? sobrenome : cSobrenome,
    sexo: sexo ? sexo : cSexo,
    telefone: telefone ? telefone : cTelefone,
    cargo: cargo ? cargo : cCargo, 
    id: cId,
  };
  currentContent[0][funcIndex] = updateFunc;
  writeFile(currentContent);

  res.json(updateFunc);
});

router.delete("/funcionarios/del/:id", (req, res) => {
  const { id } = req.params;
  const currentContent = readFile();
  const funcIndex = currentContent[0].findIndex((func) => func.id == id);
  currentContent[0].splice(funcIndex, 1);
  writeFile(currentContent);
  res.status(204).send();
});

module.exports = router;
