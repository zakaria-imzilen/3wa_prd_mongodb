export const generateCSRF = (req, res, next) => {
	const newCSRFToken = req.csrfToken(); // Generate a new CSRF Token

	req.session.CSRF = newCSRFToken; // Store the token in the session

	next(); // Forward the request to the next middleware
};

export const checkCSRF = (req, res, next) => {
	if (req.session.CSRF !== req.body._csrf) {
		res.redirect("/products");
		return;
	}
	next();
};
