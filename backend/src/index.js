const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { PORT, MONGODB_URI } = require('./config');

const recommendRoute = require('./routes/recommend');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/recommend', recommendRoute);

app.get('/', (req, res) => res.send('Soil Recommender API running'));

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
