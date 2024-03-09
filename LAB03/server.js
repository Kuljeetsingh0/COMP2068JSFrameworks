const connect = require('connect');
const url = require('url');

const app = connect();

function calculate(req, res) {
    const queryParams = new URL('http://localhost:3000' + req.url).searchParams;
    const method = queryParams.get('method');
    const x = parseFloat(queryParams.get('x'));
    const y = parseFloat(queryParams.get('y'));
    let result;

    switch (method) {
        case 'add':
            result = x + y;
            break;
        case 'subtract':
            result = x - y;
            break;
        case 'multiply':
            result = x * y;
            break;
        case 'divide':
            result = x / y;
            break;
        default:
            res.end('Error: Unsupported method. Please use add, subtract, multiply, or divide.');
            return;
    }
    res.end(${x} $
        {method.replace('multiply',
         '*').replace('divide',
         '/').replace('add',
         '+').replace('subtract',
         '-')} ${y} = ${result});
 
}

app.use(calculate);

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000/');
});