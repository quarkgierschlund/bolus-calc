// src/components/BolusSlider.tsx
import React, { useState } from 'react';

const BolusSlider = () => {
  const [bz, setBZ] = useState(6.0);
  const [kh, setKH] = useState(0);

  return (
    <div className="my-4">
      <div className="mb-4">
        <label htmlFor="bzRange" className="form-label">
          Aktueller Blutzucker: <strong>{bz.toFixed(1)}</strong> mmol/l
        </label>
        <input
          id="bzRange"
          type="range"
          className="form-range"
          min="0.1"
          max="30"
          step="0.1"
          value={bz}
          onChange={(e) => setBZ(parseFloat(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="khRange" className="form-label">
          Kohlenhydrate: <strong>{kh}</strong> g
        </label>
        <input
          id="khRange"
          type="range"
          className="form-range"
          min="0"
          max="150"
          step="1"
          value={kh}
          onChange={(e) => setKH(parseInt(e.target.value))}
        />
        <div>≈ {(kh / 10).toFixed(1)} KHE &nbsp; ≈ {(kh / 12).toFixed(1)} BE</div>
      </div>
    </div>
  );
};

export default BolusSlider;
