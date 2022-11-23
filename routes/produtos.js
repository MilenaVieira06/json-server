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

router.get("/produtos", (req, res) => {
  const content = readFile();
  res.json(content[1]);
});

router.get("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const content = readFile();
  const prod = content[1].find((prod) => prod.id == id);
  res.json(prod);
});

router.post("/produtos/add", (req, res) => {
  const { nome, marca, valor, disponivel, quantidade, imagem } = req.body;
  const id = v4();

  currentContent = readFile();
  currentContent[1].push({ nome, marca, valor, disponivel, quantidade, imagem, id });
  writeFile(currentContent);
  res.status(201).json({ nome, marca, valor, disponivel, quantidade, imagem, id });
});

router.put("/produtos/att/:id", (req, res) => {
  const { id: pId } = req.params;

  const { nome, marca, valor, disponivel, quantidade, id, imagem } = req.body;

  const currentContent = readFile();
  const prodIndex = currentContent[1].findIndex((prod) => prod.id == id);

  const {
    nome: cNome,
    marca: cMarca,
    valor: cValor,
    disponivel: cDisponivel,
    quantidade: cQuantidade,
    id: cId,
    imagem: cImagem
  } = currentContent[1][prodIndex];

  const updateprod = {
    nome: nome ? nome : cNome,
    marca: marca ? marca: cMarca,
    valor: valor ? valor: cValor,
    disponivel: disponivel ? disponivel: cDisponivel,
    quantidade: quantidade ? quantidade: cQuantidade,
    id: id ? id: cId,
    imagem: imagem ? imagem: cImagem
  };
  currentContent[1][prodIndex] = updateprod;
  writeFile(currentContent);

  res.json(updateprod);
});

router.delete("/produtos/del/:id", (req, res) => {
  const { id } = req.params;
  const currentContent = readFile();
  const prodIndex = currentContent[1].findIndex((prod) => prod.id == id);
  currentContent[1].splice(prodIndex, 1);
  writeFile(currentContent);
  res.status(204).send();
});

module.exports = router;
