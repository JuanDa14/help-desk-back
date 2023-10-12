import jwt from 'jsonwebtoken';

type TokenType = 'access-token' | 'refresh-token';

export const generateJWT = async (id: string, type: TokenType) => {
	return new Promise((resolve, reject) => {
		jwt.sign(
			{ id },
			process.env.JWT_SECRET!,
			{ expiresIn: type === 'access-token' ? '1d' : '2d' },
			(err, token) => {
				if (err) reject(err);
				resolve(token);
			}
		);
	});
};
