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

router.get("/funcionamento", (req, res) => {
  const content = readFile();
  res.json(content[2]);
});

router.get("/funcionamento/:id", (req, res) => {
  const { id } = req.params;
  const content = readFile();
  const funcionamento = content[2].find((funcionamento) => funcionamento.id == id);
  res.json(funcionamento);
});

router.post("/funcionamento/add", (req, res) => {
  const id = v4()
  const { dia_da_semana, horarios, servico, quantidade_de_vagas } = req.body;
  currentContent = readFile();
  currentContent[2].push({ dia_da_semana, horarios, servico, quantidade_de_vagas, id });
  writeFile(currentContent);
  res.status(201).json({ dia_da_semana, horarios, servico, quantidade_de_vagas, id });
});

router.put("/funcionamento/att/:id", (req, res) => {
  const { id: pId } = req.params;

  const { dia_da_semana, horarios, servico, quantidade_de_vagas, id } = req.body;

  const currentContent = readFile();
  const funcionamentoIndex = currentContent[2].findIndex((funcionamento) => funcionamento.id == pId);

  const {
    dia_da_semana: cDia_da_semana,
    horarios: cHorarios,
    servico: cServico,
    quantidade_de_vagas: cQuantidade_de_vagas,
    id: cId
  } = currentContent[2][funcionamentoIndex];

  const updatefuncionamento = {
    dia_da_semana: dia_da_semana ? dia_da_semana:  cDia_da_semana,
    horarios: horarios ? horarios: cHorarios,
    servico: servico ? servico: cServico,
    quantidade_de_vagas: quantidade_de_vagas ? quantidade_de_vagas: cQuantidade_de_vagas,
    id: id ? id: cId
  };
  currentContent[2][funcionamentoIndex] = updatefuncionamento;
  writeFile(currentContent);

  res.json(updatefuncionamento);
});

router.delete("/funcionamento/del/:id", (req, res) => {
  const { id } = req.params;
  const currentContent = readFile();
  const funcionamentoIndex = currentContent[2].findIndex((funcionamento) => funcionamento.id == Number(id));
  currentContent[2].splice(funcionamentoIndex, 1);
  writeFile(currentContent);
  res.status(204).send();
});

module.exports = router;
