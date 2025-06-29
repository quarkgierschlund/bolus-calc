// src/types/settings.ts

// Define available time slots
export type TimeOfDay = 'morning' | 'noon' | 'evening' | 'night';

export type FactorMap = Record<TimeOfDay, number>;

// Type for all user settings
export type UserSettings = {
  carbFactor: FactorMap;
  correctionFactor: FactorMap;
  targetBG: FactorMap;
  insulinDuration: number;
};

// Default values
export const defaultCarbFactor: FactorMap = {
  morning: 1.0,
  noon: 0.5,
  evening: 1.0,
  night: 1.0,
};

export const defaultCorrectionFactor: FactorMap = {
  morning: 2.0,
  noon: 2.0,
  evening: 2.0,
  night: 2.0,
};

export const defaultTargetBG: FactorMap = {
  morning: 6.0,
  noon: 6.0,
  evening: 6.0,
  night: 6.0,
};

export const defaultInsulinDuration = 3.5;

// Combined default
export const defaultUserSettings: UserSettings = {
  carbFactor: defaultCarbFactor,
  correctionFactor: defaultCorrectionFactor,
  targetBG: defaultTargetBG,
  insulinDuration: defaultInsulinDuration,
};
