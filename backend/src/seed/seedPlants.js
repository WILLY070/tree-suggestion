const mongoose = require('mongoose');
const Plant = require('../models/plant');
const { MONGODB_URI } = require('../config');

const plants = [
  { name: 'Acacia', soils: ['sandy','loam'], rainfallMin: 300, rainfallMax: 800, benefit: 'Drought tolerant, nitrogen fixer' },
  { name: 'Grevillea', soils: ['loam','clay'], rainfallMin: 600, rainfallMax: 1200, benefit: 'Agroforestry, shade' },
  { name: 'Maize', soils: ['loam'], rainfallMin: 500, rainfallMax: 1200, benefit: 'Staple crop, annual' },
  { name: 'Cassava', soils: ['sandy','loam'], rainfallMin: 400, rainfallMax: 1000, benefit: 'Drought tolerant, food security' },
  { name: 'Napier Grass', soils: ['loam','clay'], rainfallMin: 800, rainfallMax: 2000, benefit: 'Mulch, fodder, erosion control' },
  { name: 'Sesbania', soils: ['loam','clay','sandy'], rainfallMin: 400, rainfallMax: 1200, benefit: 'Nitrogen fixer, cover crop' }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    await Plant.deleteMany({});
    await Plant.insertMany(plants);
    console.log('Seeded plants');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
