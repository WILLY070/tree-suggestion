const express = require('express');
const router = express.Router();
const Plant = require('../models/plant');
const { fetchSoilByLatLon } = require('../services/soilgrids');

// Simple matching algorithm: filter by soil match and rainfall range, rank by closeness.
function rankPlants(plants, soilType, rainfall) {
  return plants
    .map(p => {
      const soilMatch = p.soils.includes(soilType);
      // rainfall closeness: if within min..max => score high; else compute distance
      let rainfallScore = 0;
      if (rainfall >= p.rainfallMin && rainfall <= p.rainfallMax) rainfallScore = 1;
      else {
        // distance normalized: the larger the distance, the lower the score
        const dist = Math.min(Math.abs(rainfall - p.rainfallMin), Math.abs(rainfall - p.rainfallMax));
        rainfallScore = Math.max(0, 1 - dist / Math.max(1000, p.rainfallMax)); // crude normalization
      }
      const score = (soilMatch ? 0.6 : 0.2) + 0.4 * rainfallScore;
      return { plant: p, score };
    })
    .sort((a,b)=> b.score - a.score)
    .map(x=> ({ name: x.plant.name, benefit: x.plant.benefit, soils: x.plant.soils, rainfallMin: x.plant.rainfallMin, rainfallMax: x.plant.rainfallMax }));
}

router.post('/', async (req, res) => {
  try {
    const { soilType, rainfall, lat, lon } = req.body;

    let soil = soilType ? soilType.toLowerCase() : null;
    let rain = rainfall ? Number(rainfall) : null;

    // If lat/lon provided, attempt SoilGrids fetch
    if ((!soil || !rain) && lat && lon) {
      const sg = await fetchSoilByLatLon(lat, lon);
      if (sg) {
        if (!soil && sg.soilTexture) soil = sg.soilTexture;
        if (!rain && sg.annualRainfall) rain = sg.annualRainfall; // Note: soilgrids doesn't provide rainfall; you'd need climate API
      }
    }

    if (!soil || !rain) {
      // If missing info, respond with a helpful error
      return res.status(400).json({ error: 'Please provide soilType and rainfall, or provide lat and lon plus rainfall.' });
    }

    const plants = await Plant.find({});
    const recs = rankPlants(plants, soil, rain).slice(0,3);

    return res.json({ soil: soil, rainfall: rain, recommendations: recs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
