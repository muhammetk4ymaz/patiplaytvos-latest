import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Comment from './Comment';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {scaledPixels} from '../../../helpers/scaledPixels';
import CustomText from '../../../components/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';

type Props = {
  isFocused: boolean;
  index: number;
};

const CommentWithStats = (props: Props) => {
  return (
    <Comment
      index={props.index}
      isFocused={props.isFocused}
      child={
        <View style={{flexDirection: 'row', gap: 12}}>
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'flex-end',
            }}>
            <IconAntDesign
              name={'like2'}
              color={props.isFocused ? 'black' : '#B0B0B0'}
              size={RFValue(8)}
            />
            <CustomText
              text="100"
              style={{
                textAlignVertical: 'center',
                fontSize: RFValue(7),
                color: props.isFocused ? 'black' : '#B0B0B0',
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 8,
              alignItems: 'flex-end',
            }}>
            <IconMaterialCommunityIcons
              name="message-reply-text-outline"
              color={props.isFocused ? 'black' : '#B0B0B0'}
              size={scaledPixels(20)}
            />
            <CustomText
              text="100"
              style={{
                textAlignVertical: 'center',
                fontSize: RFValue(7),
                color: props.isFocused ? 'black' : '#B0B0B0',
              }}
            />
          </View>
        </View>
      }
    />
  );
};

export default CommentWithStats;

const styles = StyleSheet.create({});
