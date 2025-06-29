import React from 'react';
import { useState } from 'react';
import SettingsForm from './components/SettingsForm';
import BolusSummary from './components/BolusSummary';
import { useBolusCalculator } from './hooks/useBolusCalculator';

import {
  defaultUserSettings,
  type UserSettings
} from './types/settings';

function App() {
  const [ setSettings ] = useState<UserSettings>(defaultUserSettings);
  const [bz, setBZ] = useState<number>(5.0); // Default blood glucose value
  const [kh, setKH] = useState<number>(0);   // Default carbohydrates value

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Bolus Calculator</h1>

      <div className="mb-3">
        <label>Blood Glucose (mmol/l): { bz }</label>
        <input
          type="range"
          min="0"
          max="30"
          step="0.1"
          value={bz}
          className="form-range"
          onChange={(e) => setBZ(parseFloat(e.target.value))}
        />
      </div>

      <div className="mb-3">
        <label>Carbohydrates (g): { kh }</label>
        <input
          type="range"
          min="0"
          max="150"
          step="1"
          value={kh}
          className="form-range"
          onChange={(e) => setKH(parseInt(e.target.value))}
        />
      </div>
      <SettingsForm onChange = { setSettings } />
      <BolusSummary />
    </div>
  );
}

export default App;