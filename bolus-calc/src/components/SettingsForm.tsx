import React, { useState } from 'react';
import type { TimeOfDay } from '../hooks/useBolusCalculator';

type SettingsFormProps = {
  onChange: (settings: FormData) => void;
};

export type FormData = {
  carbFactor: Record<TimeOfDay, number>;
  correctionFactor: Record<TimeOfDay, number>;
  targetBG: Record<TimeOfDay, number>;
  insulinDuration: number;
};

const defaultTimes: TimeOfDay[] = ['morning', 'noon', 'evening', 'night'];

const SettingsForm: React.FC<SettingsFormProps> = ({ onChange }) => {
  const [form, setForm] = useState<FormData>({
    carbFactor: { morning: 1, noon: 1, evening: 1, night: 1 },
    correctionFactor: { morning: 2, noon: 2, evening: 2, night: 2 },
    targetBG: { morning: 6, noon: 6, evening: 6, night: 6 },
    insulinDuration: 3.5,
  });

  const handleChange = (
    field: keyof Omit<FormData, 'insulinDuration'>,
    time: TimeOfDay,
    value: number
  ) => {
    const updated = {
      ...form,
      [field]: {
        ...form[field],
        [time]: value,
      },
    };
    setForm(updated);
    onChange(updated);
  };

  const handleDurationChange = (value: number) => {
    const updated = {
      ...form,
      insulinDuration: value,
    };
    setForm(updated);
    onChange(updated);
  };

  return (
    <div className="card p-3 mt-4">
      <h4>Settings</h4>

      {defaultTimes.map((time) => (
        <div key={time} className="row mb-2">
          <div className="col-md-3 text-capitalize">{time}</div>
          <div className="col-md-3">
            <input
              type="number"
              step="0.1"
              min="0"
              className="form-control"
              value={form.carbFactor[time]}
              onChange={(e) => handleChange('carbFactor', time, parseFloat(e.target.value))}
              placeholder="Carb Factor"
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              step="0.1"
              min="0"
              className="form-control"
              value={form.correctionFactor[time]}
              onChange={(e) => handleChange('correctionFactor', time, parseFloat(e.target.value))}
              placeholder="Correction Factor"
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              step="0.1"
              min="0"
              className="form-control"
              value={form.targetBG[time]}
              onChange={(e) => handleChange('targetBG', time, parseFloat(e.target.value))}
              placeholder="Target BG"
            />
          </div>
        </div>
      ))}

      <div className="mt-3">
        <label>Insulin Duration (hours):</label>
        <input
          type="number"
          step="0.1"
          min="0.5"
          className="form-control"
          value={form.insulinDuration}
          onChange={(e) => handleDurationChange(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default SettingsForm;
