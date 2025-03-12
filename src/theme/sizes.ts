import {scaledPixels} from '../helpers/scaledPixels';

export const sizes = {
  menu: {
    open: scaledPixels(400),
    closed: scaledPixels(100),
    icon: scaledPixels(20),
  },
  view: {
    gap: scaledPixels(24),
    horizontalPadding: scaledPixels(48),
  },
  list: {
    columnGap: scaledPixels(18),
    rowGap: scaledPixels(24),
  },
};
