import {
  SpatialNavigationScrollView,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import {theme} from '../../../theme/theme';
import {Button} from '../../../components/Button';
import {Dimensions, View} from 'react-native';
import {scaledPixels} from '../../../helpers/scaledPixels';

type Props = {
  additionalOffset: number;
};

const SeasonsTabs = (props: Props) => {
  const arr = new Array(20).fill(1).map((_, i) => i * 2);
  return (
    <SpatialNavigationScrollView
      horizontal
      contentContainerStyle={{
        paddingHorizontal: theme.sizes.view.horizontalPadding,
        marginBottom: scaledPixels(4),
      }}>
      <SpatialNavigationView
        direction="horizontal"
        style={{
          gap: theme.sizes.list.columnGap,
        }}>
        {arr.map(index => (
          <Button
            label={'Season ' + index}
            key={index}
            additionalOffset={props.additionalOffset}
          />
        ))}
      </SpatialNavigationView>
    </SpatialNavigationScrollView>
  );
};

export default SeasonsTabs;
