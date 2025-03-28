import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import ProgressIndicator from '../../../components/Custom/ProgressIndicator';
import CustomText from '../../../components/CustomText';
import HorizontalScrollableList from '../../../components/HorizontalScrollableList';
import {textStyles} from '../../../constants/TextStyle';
import {scaledPixels} from '../../../helpers/scaledPixels';
import {theme} from '../../../theme/theme';
import SeasonsTabs from './SeasonTabs';
import {SpatialNavigationNode} from 'react-tv-space-navigation';

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
            height: scaledPixels(54),
          }}>
          <SeasonsTabs
            additionalOffset={theme.sizes.additionalOffset.listItem}
          />
        </View>
      }
      additionalOffset={
        scaledPixels(54) +
        theme.sizes.additionalOffset.listItem +
        theme.sizes.view.rowGap
      }
      listTitle="Trailers"
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
                color: isFocused
                  ? theme.colors.text.primary
                  : theme.colors.text.third,
                fontSize: theme.typography['2xs'],
              }}
            />
          </View>
        );
      }}
      childrenHeight={theme.typography['2xs'] + 12}
    />
  );
};

export default TitleTrailerList;

const styles = StyleSheet.create({});
