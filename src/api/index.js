import { version } from '../../package.json';
import { Router } from 'express';
import wallet from './wallet'

export default ({ config, db }) => {
	let api = Router();

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.get('/wallet/:id', wallet.getBalance)
	return api;
}
