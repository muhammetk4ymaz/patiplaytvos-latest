import {RFValue} from 'react-native-responsive-fontsize';
import {scaledPixels} from '../helpers/scaledPixels';

export const typography = {
  '2xs': RFValue(7),
  xs: RFValue(9),
  sm: RFValue(11),
  md: RFValue(13),
  lg: RFValue(15),
  xl: RFValue(17),
  '2xl': RFValue(19),
  listTitle: scaledPixels(27),
};
