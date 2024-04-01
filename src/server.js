let express = require('express'); // express is middleware that handles connection for you
let app = express();
let http = require("http");
let PORT = 80;

app.use(express.static('./public'));
app.get('/', function (req, res) {

});

const httpSever = http.createServer(app);
httpSever.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});