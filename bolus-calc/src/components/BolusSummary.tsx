import React from 'react';
import { useBolusCalculator } from '../hooks/useBolusCalculator';

const BolusSummary = () => {
  const result = useBolusCalculator(8.5, 60, {
    carbFactor: { morning: 1.0, noon: 1.0, evening: 1.0, night: 1.0 },
    correctionFactor: { morning: 2.0, noon: 2.0, evening: 2.0, night: 2.0 },
    targetBG: { morning: 6.0, noon: 6.0, evening: 6.0, night: 6.0 },
    insulinDuration: 3.5,
  }, false);

  return (
    <div className="card p-3">
      <h4>Bolus Summary</h4>
      <p>KH equivalents (KHE): <strong>{result.khes}</strong></p>
      <p>Bread units (BE): <strong>{result.bes}</strong></p>

      <table className="table table-sm table-bordered mt-3">
        <thead>
          <tr>
            <th>Time of Day</th>
            <th>Correction Insulin</th>
            <th>Carb Insulin</th>
            <th>Total Insulin</th>
          </tr>
        </thead>
        <tbody>
          {(['morning', 'noon', 'evening', 'night'] as const).map((time) => (
            <tr key={time}>
              <td>{time}</td>
              <td>{result.correctionInsulin[time]} IE</td>
              <td>{result.carbInsulin[time]} IE</td>
              <td><strong>{result.totalInsulin[time]} IE</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BolusSummary;
