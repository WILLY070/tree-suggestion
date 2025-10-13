import React from 'react';

export default function Results({ data }) {
  if (!data) return null;
  return (
    <div style={{ marginTop: 16 }}>
      <h3>Recommendations</h3>
      <div>Soil: <b>{data.soil}</b> | Rainfall: <b>{data.rainfall} mm</b></div>
      <ul>
        {data.recommendations.map((r, i) => (
          <li key={i} style={{ margin: '8px 0', padding: 8, border: '1px solid #ddd' }}>
            <strong>{r.name}</strong>
            <div>{r.benefit}</div>
            <div><small>Suitable soils: {r.soils.join(', ')} | Rainfall: {r.rainfallMin}-{r.rainfallMax} mm</small></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
