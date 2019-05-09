import getDistance from './getDistance';
import { GeolibInputCoordinates } from './types';

// Returns the minimum distance from a point to a line
// TODO: this is untested. Add tests.
const getDistanceFromLine = (
    point: GeolibInputCoordinates,
    start: GeolibInputCoordinates,
    end: GeolibInputCoordinates
) => {
    const d1 = getDistance(start, point);
    const d2 = getDistance(point, end);
    const d3 = getDistance(start, end);
    let distance = 0;

    // alpha is the angle between the line from start to point, and from start to end
    const alpha = Math.acos((d1 * d1 + d3 * d3 - d2 * d2) / (2 * d1 * d3));

    // beta is the angle between the line from end to point and from end to start //
    const beta = Math.acos((d2 * d2 + d3 * d3 - d1 * d1) / (2 * d2 * d3));

    // if the angle is greater than 90 degrees, then the minimum distance is the
    // line from the start to the point
    if (alpha > Math.PI / 2) {
        distance = d1;
    } else if (beta > Math.PI / 2) {
        // same for the beta
        distance = d2;
    } else {
        // otherwise the minimum distance is achieved through a line perpendular to the start-end line,
        // which goes from the start-end line to the point
        distance = Math.sin(alpha) * d1;
    }

    return distance;
};

export default getDistanceFromLine;
