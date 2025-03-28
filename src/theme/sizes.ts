import {scaledPixels} from '../helpers/scaledPixels';
import {theme} from './theme';

export const sizes = {
  menu: {
    open: scaledPixels(250),
    closed: scaledPixels(100),
    icon: scaledPixels(20),
  },
  view: {
    columnGap: scaledPixels(16),
    rowGap: scaledPixels(24),
    horizontalPadding: scaledPixels(48),
  },
  list: {
    columnGap: scaledPixels(16),
    rowGap: scaledPixels(24),
  },

  additionalOffset: {
    listItem: 2 * scaledPixels(24) + scaledPixels(28), // 2 * rowGap + listTitle
  },
};
