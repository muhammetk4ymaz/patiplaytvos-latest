import {StyleSheet, Text, View} from 'react-native';
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

type Props = {};

const TitleClipsList = (props: Props) => {
  const imagePaths2 = [
    'https://image.tmdb.org/t/p/w500/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg',
    'https://image.tmdb.org/t/p/w500/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg',
    'https://image.tmdb.org/t/p/w500/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg',
    'https://image.tmdb.org/t/p/w500/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg',
    'https://image.tmdb.org/t/p/w500/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg',
  ];

  return (
    <HorizontalScrollableList
      additionalOffset={scaledPixels(76)}
      listTitle="Clips"
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
              text={`Şehzade Mustafa'nın ölümü`}
              numberOfLines={1}
              style={{
                color: 'white',
                opacity: isFocused ? 1 : 0.5,
                fontSize: RFValue(8),
              }}
            />
          </View>
        );
      }}
      childrenHeight={12 + RFValue(8)}
    />
  );
};

export default TitleClipsList;

const styles = StyleSheet.create({});

const SeasonsTabs = () => {
  const arr = new Array(20).fill(1).map((_, i) => i * 2);
  return (
    <SpatialNavigationScrollView
      horizontal
      style={{
        paddingHorizontal: theme.sizes.view.horizontalPadding,
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
            additionalOffset={theme.sizes.view.rowGap}
          />
        ))}
      </SpatialNavigationView>
    </SpatialNavigationScrollView>
  );
};
