import test from 'ava';
import {
  calcDeltas,
  calcForce,
  calcDistSquared,
  calcAcceleration,
  updateBodies
} from '../src';

const g = 39.5;
const softeningConstant = 0.1;

const body1 = { x: 0, y: 0, z: 0, m: 1, ax: 0, ay: 0, az: 0 };
const body2 = { x: 1, y: 2, z: 0, m: 1.1, ax: 0, ay: 0, az: 0 };

test('calcDeltas', t => {
  t.deepEqual(calcDeltas(body1, body2), { dx: 1, dy: 2, dz: 0 });
});

test('calculates the distance squared', t => {
  t.is(calcDistSquared({ dx: 1, dy: 1, dz: 1 }), 3);
  // t.is(calcDistSquared(2, 2, 2), 12);
  // t.is(calcDistSquared(3, 3, 1), 19);
});

test('calculates F', t => {
  t.is(calcForce(g, softeningConstant, 1, 1), 37.661772275200896);
});

test('calculate acceleration', t => {
  t.deepEqual(calcAcceleration(1, softeningConstant, body1, body2), {
    ax: 0.09741763740941049,
    ay: 0.19483527481882099,
    az: 0.09741763740941049,
  });
});

test('update bodies', t => {
  console.log(calcDistSquared(calcDeltas(body1, body2)));
  console.time('start');
  const bodies = updateBodies(1, softeningConstant, [body1, body2]);
  console.timeEnd('start');
  console.log(calcDistSquared(calcDeltas(body1, body2)));

  t.is(bodies[1].ax, -0.10517023508026825);
  t.is(bodies[1].ay, -0.2103404701605365);
  t.is(bodies[1].az, -0.31551070524080477);
});
