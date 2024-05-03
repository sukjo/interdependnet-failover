let express = require('express'); // express is middleware that handles connection for you
let app = express();
let http = require("http");
let PORT = 3000;

app.use(express.static('/root/static-site/public'));

/*
app.get('/', function (req, res) {
res.send('backup site is running');
});
*/

const httpSever = http.createServer(app);
httpSever.listen(PORT, '::', () => {
  console.log(`server has started on port ${PORT}`);
});
