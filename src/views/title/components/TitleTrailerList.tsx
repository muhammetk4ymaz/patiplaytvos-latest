import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HorizontalScrollableList from '../../../components/HorizontalScrollableList';
import {
  SpatialNavigationScrollView,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import {theme} from '../../../theme/theme';
import {scaledPixels} from '../../../helpers/scaledPixels';
import ProgressIndicator from '../../../components/Custom/ProgressIndicator';
import CustomText from '../../../components/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import {Button} from '../../../components/Button';
import {textStyles} from '../../../constants/TextStyle';
import SeasonsTabs from './SeasonTabs';

type Props = {};

const TitleTrailerList = (props: Props) => {
  const imagePaths2 = [
    'https://image.tmdb.org/t/p/w500/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg',
    'https://image.tmdb.org/t/p/w500/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg',
    'https://image.tmdb.org/t/p/w500/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg',
    'https://image.tmdb.org/t/p/w500/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg',
    'https://image.tmdb.org/t/p/w500/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg',
  ];

  return (
    <HorizontalScrollableList
      listTitleComponent={
        <View
          style={{
            marginTop: 2 * theme.sizes.list.rowGap,
            height: scaledPixels(113) + 2 * theme.sizes.list.rowGap,
            gap: theme.sizes.list.rowGap,
          }}>
          <CustomText
            text={'Trailers'}
            style={[
              textStyles().listTitle,
              {
                marginLeft: theme.sizes.view.horizontalPadding,
              },
            ]}
          />
          <SeasonsTabs additionalOffset={scaledPixels(70)} />
        </View>
      }
      additionalOffset={scaledPixels(133) + 2 * theme.sizes.list.rowGap}
      listTitleHeight={scaledPixels(113) + 2 * theme.sizes.list.rowGap}
      imagePaths={imagePaths2}
      aspectRatio={16 / 9}
      viewableItems={5}
      posterChildren={props => (
        <View style={{justifyContent: 'flex-end', height: '100%'}}>
          <ProgressIndicator
            percentage={props.index * 10}
            runtime={120}
            isFocused={props.isFocused}
          />
        </View>
      )}
      children={(isFocused, index) => {
        return (
          <View style={{marginTop: 12}}>
            <CustomText
              text={`E${index + 1} • Entrance Entrance`}
              numberOfLines={1}
              style={{
                color: 'white',
                fontSize: RFValue(8),
                opacity: isFocused ? 1 : 0.5,
              }}
            />
          </View>
        );
      }}
      childrenHeight={12 + RFValue(8)}
    />
  );
};

export default TitleTrailerList;

const styles = StyleSheet.create({});
