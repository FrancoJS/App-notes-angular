import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
	let token = req.headers.authorization;
	if (!token) return res.status(401).json({ ok: false, message: "No estas autorizado para realizar esta accion" });

	token = token.split(" ")[1];

	try {
		const { user_id } = jwt.verify(token, process.env.JWT_SECRET);
		req.user_id = user_id;
		next();
	} catch (error) {
		res.status(401).json({ ok: false, message: "No estas autorizado para realizar esta accion, Token invalido" });
	}
};

export default verifyToken;
