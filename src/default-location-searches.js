import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'default-utah',
    predictionPlace: {
      address: 'Utah',
      bounds: new LatLngBounds(
        new LatLng(43.14102317, -108.60570346),
        new LatLng(34.38871699, -114.65288897)
      ),
    },
  },
  {
    id: 'default-colorado',
    predictionPlace: {
      address: 'Colorado',
      bounds: new LatLngBounds(
        new LatLng(43.04018248, -101.51224562),
        new LatLng(34.27468742, -109.8566166)
      ),
    },
  },
  {
    id: 'default-wyoming',
    predictionPlace: {
      address: 'Wyoming',
      bounds: new LatLngBounds(
        new LatLng(46.86928099, -103.37482842),
        new LatLng(38.62725731, -111.71919941)
      ),
    },
  },
  // {
  //   id: 'default-seattle',
  //   predictionPlace: {
  //     address: 'Seattle, Washington, USA',
  //     bounds: new LatLngBounds(
  //       new LatLng(47.7779392908564, -122.216605992108),
  //       new LatLng(47.3403950185547, -122.441233019046)
  //     ),
  //   },
  // },
  // {
  //   id: 'default-portland',
  //   predictionPlace: {
  //     address: 'Portland, Oregon, USA',
  //     bounds: new LatLngBounds(
  //       new LatLng(45.858099013046, -122.441059986416),
  //       new LatLng(45.3794799927623, -122.929215816001)
  //     ),
  //   },
  // },
];
