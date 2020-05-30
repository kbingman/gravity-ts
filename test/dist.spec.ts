import test from 'ava';
import {
  metersToAU,
  auToMeters,
  metersPerSecToG,
  gToMetersPerSec,
  transitTime,
  formatTime
} from '../src/dist';

test('meters to AU', t => {
  t.is(metersToAU(7.45e10), 0.5);
  t.is(metersToAU(2.98e11), 2);
});

test('AU to meters', t => {
  t.is(auToMeters(0.5), 7.45e10);
  t.is(auToMeters(2), 2.98e11);
});

test('metersPerSecToG', t => {
  t.is(metersPerSecToG(9.81), 1);
  t.is(metersPerSecToG(4.905), 0.5);
});

test('gToMetersPerSec', t => {
  t.is(gToMetersPerSec(0.5), 4.905);
  t.is(gToMetersPerSec(2), 19.62);
});

test('transitTime', t => {
  t.is(formatTime(transitTime(auToMeters(1), gToMetersPerSec(1))), 68.47);
  t.is(formatTime(transitTime(auToMeters(1), gToMetersPerSec(0.1))), 216.51);
  t.is(formatTime(transitTime(3.844e8, gToMetersPerSec(1))), 3.48);
  t.is(formatTime(transitTime(3.844e8, gToMetersPerSec(0.01))), 34.78);
  t.is(formatTime(transitTime(3.844e8, gToMetersPerSec(0.1))), 11);
  t.is(formatTime(transitTime(1.880e11, gToMetersPerSec(0.1))), 243.2);
})
