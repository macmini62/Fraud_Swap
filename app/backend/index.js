const express = require("express");
const cors = require("cors");
const route = require("./route.js");

const port = 6666;
const corOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200
};
const app = express();

// middleware
app.use(cors(corOptions));
app.use(express.json());
app.use("/", route);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});