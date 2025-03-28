import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import ProgressIndicator from '../../../components/Custom/ProgressIndicator';
import CustomText from '../../../components/CustomText';
import HorizontalScrollableList from '../../../components/HorizontalScrollableList';
import {scaledPixels} from '../../../helpers/scaledPixels';
import {theme} from '../../../theme/theme';

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
      additionalOffset={
        theme.typography.listTitle + 2 * theme.sizes.list.rowGap
      }
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

export default TitleClipsList;

const styles = StyleSheet.create({});
