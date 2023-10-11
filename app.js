import express from "express";
import connecting from "./db/conn.js";
import bodyParser from "body-parser";
import csurf from "csurf";
import session from "express-session";
import productsRouter from "./routers/products.js";

const port = 4001;

const app = express();

// Connect to DB
connecting()
	.then(() => console.log("Well connected to DB"))
	.catch((err) => console.log("Couldn't connect to DB" + err));

// Parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: "dshjbjf78234", resave: true }));

app.use(csurf({ cookie: false }));

app.set("view engine", "ejs");
app.use(express.static("public"));

// Routers
app.use("/products", productsRouter);

app.listen(port, () => console.log("Listening on the port: " + port));
