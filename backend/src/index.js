//import helmet from "helmet";
const helmet = require("helmet");
//import compression from "compression";
const compression = require("compression");
//import morgan from "morgan";
const morgan = require("morgan");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { PORT, MONGODB_URI } = require('./config');

const recommendRoute = require('./routes/recommend');

const app = express();
app.use(helmet()); // secure HTTP headers
app.use(compression()); // compress responses
app.use(morgan('combined')); // production logging

app.use(cors());
app.use(express.json());
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error(err));


app.use('/api/recommend', recommendRoute);

app.get('/', (req, res) => res.send('Soil Recommender API running'));
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", time: new Date() });
});


async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  } catch (err) {
    console.error('Failed to start', err);
  }
}

start();
