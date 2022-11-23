const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const funcionarioRouter = require("./routes/funcionarios");
const produtoRouter = require("./routes/produtos");
const funcionamentoRouter = require("./routes/funcionamento");

app.use("/", funcionarioRouter);
app.use("/", produtoRouter);
app.use("/", funcionamentoRouter);


app.listen(port, () => {
  console.log("Servidor online");
});
