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
          <View
            style={{
              height: scaledPixels(54),
            }}>
            <SeasonsTabs additionalOffset={scaledPixels(70)} />
          </View>
        </View>
      }
      additionalOffset={scaledPixels(124) + theme.sizes.list.rowGap}
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
      childrenHeight={RFValue(8) + 12}
    />
  );
};

export default TitleTrailerList;

const styles = StyleSheet.create({});
