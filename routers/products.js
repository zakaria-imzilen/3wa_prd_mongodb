import { Router } from "express";
import { client } from "../db/conn.js";
import { checkCSRF, generateCSRF } from "../middlewares/csrf.js";
import { checkPRD } from "../middlewares/product.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
	const products = await client
		.db("3WA_products")
		.collection("products")
		.find()
		.toArray();

	res.render("index", { products });
});

productsRouter.get("/dashboard", generateCSRF, async (req, res, next) => {
	const products = await client
		.db("3WA_products")
		.collection("products")
		.find()
		.toArray();

	res.render("dashboard", { products, csrf: req.session.CSRF });
});

productsRouter.post("/update/:id", checkCSRF, checkPRD, (req, res, next) => {
	const myPRD = req.session.prd;
	console.log(req.body);
	// Update the product in DB
	const { name, price, color, size } = req.body;

	client
		.db("3WA_products")
		.collection("products")
		.updateOne({ id: myPRD.id }, { $set: { name, price, color, size } })
		.then((resp) => {
			res.redirect("/products/dashboard");
		})
		.catch(() => {
			res.redirect("/products/dashboard");
		});
});

productsRouter.get("/:id", async (req, res, next) => {
	// 1- Capture the id from the param
	const { id } = req.params;
	// 2- Retrieve product data from DB
	const product = await client
		.db("3WA_products")
		.collection("products")
		.findOne({ id: Number(id) });

	// 3- Render EJS
	res.render("product", { data: product });
});

export default productsRouter;
