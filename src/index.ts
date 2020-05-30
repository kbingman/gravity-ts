import { Body, Delta } from './types';

/**
 * @param body1 - primary body
 * @param body2 - secondary body
 * Returns the deltas of the two bodies
 */
export const calcDeltas = (body1: Body, body2: Body): Delta => ({
  dx: body2.x - body1.x,
  dy: body2.y - body1.y,
  dz: body2.z - body1.z
});

/**
 * @param dx - deltaX
 * @param dy - deltaY
 * @param dz - deltaZ
 * Given 3 deltas, calculates the squared distance
 */
export const calcDistSquared = ({ dx, dy, dz}: Delta): number =>
  dx * dx + dy * dy + dz * dz;

/**
 * @param g Gravitational constant
 * @param softeningConstant
 * @param mass of body - mass of the primary body
 * @param distSquared - the square of the dist of the 2 bodies
 * calculates the force of a given body and dist
 */
export const calcForce = (
  g: number,
  softeningConstant: number,
  mass: number,
  distSquared: number
): number =>
  g * mass / (distSquared * Math.sqrt(distSquared + softeningConstant));

/**
 * @param g Gravitational constant
 * @param softeningConstant
 * @param body1 - the primary body
 * @param body2 - the secondary body
 * calculates the force of a given body and dist
 */
export const calcAcceleration = (
  g: number,
  softeningConstant: number,
  body1: Body,
  body2: Body
) => {
  const { dx, dy, dz } = calcDeltas(body1, body2);
  const distSquared = calcDistSquared({dx, dy, dz});
  const f = calcForce(g, softeningConstant, body2.m, distSquared);

  return {
    ax: dx * f,
    ay: dy * f,
    az: dx * f
  };
};

// Loop through all bodies
// Curry calcAcceleration with first three variables
// Loop through all bodies getting acl for each other body
// update each body
export const updateBodies = (
  g: number,
  softeningConstant: number,
  bodies: Body[]
): Body[] => {
  for (const body1 of bodies) {
    for (const body2 of bodies) {
      if (body1 !== body2) {
        const acc = calcAcceleration(g, softeningConstant, body1, body2);
        body1.ax = body1.ax + acc.ax;
        body1.ay = body1.ay + acc.ay;
        body1.az = body1.ay + acc.az;
      }
    }

    body1.x = body1.x + body1.ax;
    body1.y = body1.y + body1.ay;
    body1.z = body1.z + body1.az;
    body1.ax = body1.ax;
    body1.ay = body1.ay;
    body1.az = body1.az;
  }
  return bodies;
}
