import {TextStyle} from 'react-native';
import {theme} from '../theme/theme';
import {scaledPixels} from '../helpers/scaledPixels';
import {RFValue} from 'react-native-responsive-fontsize';

export const textStyles = function (isActive?: boolean): {
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
      fontSize: theme.typography.listTitle,
      fontWeight: '600',
      color: isActive ? theme.colors.text.primary : theme.colors.text.third,
    },
    modalTitle: {
      color: 'white',
      fontSize: RFValue(10),
      fontWeight: 'bold',
    },
  };
};
