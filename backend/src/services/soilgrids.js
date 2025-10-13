const axios = require('axios');
const { SOILGRIDS_BASE } = require('../config');

/**
 * Fetch simple properties from SoilGrids for a lat/lon
 * Returns a minimal object: { soilTexture: 'sandy/loam/clay', pH: x, organicCarbon: y }
 */
async function fetchSoilByLatLon(lat, lon) {
  try {
    // This is a simple approach: ISRIC has variable endpoints; adjust as needed.
    // Example endpoint used by some: `${SOILGRIDS_BASE}/soilgrids/v2.0/properties/query`
    const url = `${SOILGRIDS_BASE}/soilgrids/v2.0/properties/query?lat=${lat}&lon=${lon}`;
    const resp = await axios.get(url);
    const data = resp.data;
    // Parse response according to actual SoilGrids shape — here's a minimal safe parse with fallbacks.
    // You will need to adapt field names to the actual returned JSON.
    const result = {};
    // attempt to extract texture and organic carbon if present
    if (data && data.properties) {
      // Example: data.properties.SOC etc. Implementation depends on real response
      // We'll add safe checks:
      result.organicCarbon = data.properties?.soc?.mean ?? null;
      result.pH = data.properties?.phh2o?.mean ?? null;
      // dummy coarse mapping to soil texture if texture class exists
      const texture = data.properties?.texture_class?.dominant ?? null;
      if (texture) {
        const t = texture.toLowerCase();
        if (t.includes('sand')) result.soilTexture = 'sandy';
        else if (t.includes('clay')) result.soilTexture = 'clay';
        else result.soilTexture = 'loam';
      } else {
        result.soilTexture = null;
      }
    }
    return result;
  } catch (err) {
    console.warn('SoilGrids fetch failed', err.message);
    return null;
  }
}

module.exports = { fetchSoilByLatLon };
