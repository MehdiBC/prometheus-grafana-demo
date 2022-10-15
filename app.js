const express = require('express');
const app = express();
const port = 3000;

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
    res.send(`${fibResult}`);
  } catch (e) {
    res.statusCode = 400;
    res.send(e.message);
  }
});

app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});
