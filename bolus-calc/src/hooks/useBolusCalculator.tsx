import { useMemo } from 'react';

type Factors = {
  carbFactor: Record<TimeOfDay, number>;
  correctionFactor: Record<TimeOfDay, number>;
  targetBG: Record<TimeOfDay, number>;
  insulinDuration: number;
};

type CalculationResult = {
  correctionInsulin: Record<TimeOfDay, number>;
  carbInsulin: Record<TimeOfDay, number>;
  totalInsulin: Record<TimeOfDay, number>;
  khes: number; // carbs / 10
  bes: number;  // carbs / 12
};

export function useBolusCalculator(
  bloodGlucose: number,
  carbohydrates: number,
  factors: Factors,
  isExercising: boolean
): CalculationResult {
  return useMemo(() => {
    const times: TimeOfDay[] = ['morning', 'noon', 'evening', 'night'];
    const correctionInsulin: Record<TimeOfDay, number> = { morning: 0, noon: 0, evening: 0, night: 0 };
    const carbInsulin: Record<TimeOfDay, number> = { morning: 0, noon: 0, evening: 0, night: 0 };
    const totalInsulin: Record<TimeOfDay, number> = { morning: 0, noon: 0, evening: 0, night: 0 };

    times.forEach((time) => {
      const cf = factors.correctionFactor[time];
      const target = factors.targetBG[time];
      const carbF = factors.carbFactor[time];

      correctionInsulin[time] = parseFloat(((bloodGlucose - target) / cf).toFixed(1));
      carbInsulin[time] = parseFloat(((carbohydrates * carbF) / 10).toFixed(1));

      let total = correctionInsulin[time] + carbInsulin[time];
      if (isExercising) total *= 0.5;

      totalInsulin[time] = parseFloat(total.toFixed(1));
    });

    return {
      correctionInsulin,
      carbInsulin,
      totalInsulin,
      khes: parseFloat((carbohydrates / 10).toFixed(1)),
      bes: parseFloat((carbohydrates / 12).toFixed(1)),
    };
  }, [bloodGlucose, carbohydrates, factors, isExercising]);
}
export type TimeOfDay = 'morning' | 'noon' | 'evening' | 'night';