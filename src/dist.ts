const METERS_IN_AU = 1.49e11;
const ONE_G_MS = 9.81; // meters per second
const SECONDS_HOUR = 3600;

export const metersToAU = (meters: number) => meters / METERS_IN_AU;

export const auToMeters = (au: number) => au * METERS_IN_AU;

export const gToMetersPerSec = (g: number) => g * ONE_G_MS;

export const metersPerSecToG = (ms: number) => ms / ONE_G_MS;

export const transitTime = (d: number, a: number) => 2 * Math.sqrt(d / a);

export const formatTime = (sec: number) =>
  Math.round(sec / SECONDS_HOUR * 100) / 100;
