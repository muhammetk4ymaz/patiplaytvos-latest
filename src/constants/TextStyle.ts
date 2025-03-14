import {TextStyle} from 'react-native';
import {theme} from '../theme/theme';
import {scaledPixels} from '../helpers/scaledPixels';
import {RFValue} from 'react-native-responsive-fontsize';

export const textStyles = function (): {
  [key: string]: TextStyle & {fontSize: number};
} {
  const scale = scaledPixels(1);

  return {
    default: {
      fontSize: theme.typography.sm,
    },
    defaultSemiBold: {
      fontSize: 16 * scale,
      lineHeight: 24 * scale,
      fontWeight: '600',
    },

    subtitle: {
      fontSize: 20 * scale,
      lineHeight: 20 * scale,
      fontWeight: 'bold',
    },
    link: {
      lineHeight: 30 * scale,
      fontSize: 16 * scale,
    },
    listTitle: {
      color: 'white',
      fontSize: scaledPixels(28),
      fontWeight: '600',
    },
    sectionTitle: {
      color: 'white',
      fontSize: RFValue(10),
      fontWeight: 'bold',
    },
  };
};
