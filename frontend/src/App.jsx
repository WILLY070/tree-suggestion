import React, { useState } from 'react';
import RecommendForm from './components/RecommendForm';
import Results from './components/Results';

function App(){
  const [results, setResults] = useState(null);

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Soil-Friendly Crop & Tree Recommender</h1>
      <p>Enter soil & rainfall or coordinates. We'll recommend suitable plants.</p>
      <RecommendForm onResults={setResults} />
      <Results data={results} />
    </div>
  );
}

export default App;

