const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const app = express();
const apis = require("./routes");

const PORT = 8080;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(apis);

app.listen(process.env.port || PORT, () => {
  console.log(`Server started at port ${process.env.PORT || PORT}`);
});
