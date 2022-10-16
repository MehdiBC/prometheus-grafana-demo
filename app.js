const express = require('express');
const app = express();
const port = 3000;

const client = require('prom-client');
const metricNumberHttpReq = new client.Counter({
  name: 'http_request_total',
  help: 'Total number of received requests',
  labelNames: ['status'],
});

/**
 * Fibonacci number computing using dynamic programming
 *
 * @param {number} n
 * @return {number} fibonacci number at index n
 * */
function fib(n){
  if(!n || n<0) throw new Error('Parameter must be a positive integer');
  if(n === 0 || n === 1) return 1;
  const fibList = [1, 1];
  for(let i=1; i<n; i++){
    fibList.push(fibList[i-1] + fibList[i]);
  }
  return fibList[n];
}

/**
 * Validation request function
 *
 * @param {Request} req
 */
function validate(req){
  if(!req.query.number) throw new Error('Invalid query');
}


/**
 * Endpoint for fibonacci number calculation
 *
 * @param {Request} req
 * @param {Response} res
 */
app.get('/', (req, res) => {
  try{
    validate(req);
    const fibResult = fib(parseInt(req.query["number"]));
    res.statusCode = 200;
    metricNumberHttpReq.labels("200").inc();
    res.send(`${fibResult}`);
  } catch (e) {
    res.statusCode = 400;
    metricNumberHttpReq.labels("400").inc();
    res.send(e.message);
  }
});

/**
 * Endpoint for exporting metrics
 *
 * @param {Request} req
 * @param {Response} res
 */
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.send(await client.register.metrics());
});

app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});
