import { client } from "../db/conn.js";

export const checkPRD = (req, res, next) => {
	const { id } = req.params;

	client
		.db("3WA_products")
		.collection("products")
		.findOne({ id: Number(id) })
		.then((prd) => {
			// IF FOUND
			if (prd) {
				console.log("FOUND");
				req.session.prd = prd; // Store the product details in the session
				next();
				return;
			}
			// NOT FOUND
			res.redirect("/products");
		})
		.catch((err) => {
			console.log("Error" + err);
			// Something went wrong, redirect him back to products
			res.redirect("/products");
		});
};
