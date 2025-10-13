import React, { useState } from 'react';
import { getRecommendations } from '../api';

export default function RecommendForm({ onResults }) {
  const [soilType, setSoilType] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload = {};
      if (soilType) payload.soilType = soilType;
      if (rainfall) payload.rainfall = Number(rainfall);
      if (lat && lon) { payload.lat = Number(lat); payload.lon = Number(lon); }
      const data = await getRecommendations(payload);
      onResults(data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 520 }}>
      <div>
        <label>Soil type (sandy / loam / clay)</label>
        <input value={soilType} onChange={(e)=>setSoilType(e.target.value)} placeholder="e.g., loam" />
      </div>
      <div>
        <label>Annual rainfall (mm)</label>
        <input type="number" value={rainfall} onChange={(e)=>setRainfall(e.target.value)} placeholder="e.g., 800" />
      </div>
      <div style={{ marginTop: 8 }}>
        <small>OR provide coordinates (lat & lon) — Soil properties can be auto-fetched (if supported).</small>
      </div>
      <div>
        <label>Latitude</label>
        <input value={lat} onChange={(e)=>setLat(e.target.value)} placeholder="e.g., -1.2921" />
      </div>
      <div>
        <label>Longitude</label>
        <input value={lon} onChange={(e)=>setLon(e.target.value)} placeholder="e.g., 36.8219" />
      </div>

      {error && <div style={{ color:'red' }}>{error}</div>}

      <button type="submit" disabled={loading}>{loading ? 'Finding...' : 'Get Recommendations'}</button>
    </form>
  );
}
