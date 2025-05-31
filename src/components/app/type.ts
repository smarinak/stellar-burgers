import { Location } from 'react-router-dom';

export type TLocationState =
  | {
      background?: Location;
    }
  | undefined;
