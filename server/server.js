const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const webRouter = require('./routes/web');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());


app.use('/', webRouter);



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
