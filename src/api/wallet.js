import resource from 'resource-router-middleware';
import facets from '../models/facets';
import { getTokenBalance } from '../lib/blockchain';

function getBalance(req, res) {
  getTokenBalance(req.params.id).then(balance => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ balance: balance }));
  })
}

export default { getBalance }