const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./auth-model.js');
const { jwtSecret } = require('../api/secrets.js');

router.post('/register', (req, res) => {
	let user = req.body;
	const rounds = process.env.HASH_ROUNDS || 8;
	const hash = bcrypt.hashSync(user.password, rounds);

	user.password = hash;
	Users.add(user)
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ errorMessage: error.message });
		});
});

router.post('/login', (req, res) => {
	let { username, password } = req.body;
	Users.findBy({ username })
		.first()
		.then((user) => {
			const token = generateToken(user);
			user && bcrypt.compareSync(password, user.password)
				? res.status(200).json({ message: 'You are logged in', token })
				: res.status(401).json({ message: 'The passage is a different way' });
		})
		.catch(() => {
			res.status(500).json({ errorMessage: 'There was an error' });
		});
});

function generateToken(user) {
	const payload = {
		subject: user.id,
		username: user.username,
	};

	const options = {
		expiresIn: '1h',
	};

	return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
