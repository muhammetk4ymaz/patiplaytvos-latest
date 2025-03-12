import {Dimensions} from 'react-native';
import {scaledPixels} from '../helpers/scaledPixels';
import {theme} from '../theme/theme';

const width = Dimensions.get('window').width;
const gap = theme.sizes.list.columnGap;
const padding = theme.sizes.view.horizontalPadding;

export const calculateGridItemWidth = (numColumns: number) => {
  return (width - 2 * padding - (numColumns - 1) * gap) / numColumns;
};
