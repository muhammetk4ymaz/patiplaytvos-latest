import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {scaledPixels} from '../../../helpers/scaledPixels';
import CircleAvatar from '../../../components/CircleAvatar';
import CustomText from '../../../components/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import ModalItem from '../../../components/Modal/ModalItem';

type Props = {
  isFocused: boolean;
  index: number;
  child?: React.ReactNode;
};

const Comment = (props: Props) => {
  return (
    <ModalItem
      isFocused={props.isFocused}
      height={Dimensions.get('window').height * 0.25}>
      <CommentContent isFocused={props.isFocused} />
      {props.child}
    </ModalItem>
  );
};

export default Comment;

const styles = StyleSheet.create({});

export const CommentContent = ({isFocused}: {isFocused?: boolean}) => {
  return (
    <View style={{gap: 12}}>
      <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
        <CircleAvatar size={scaledPixels(45)} />
        <CustomText
          text="@johnDoe • 2d ago"
          style={{
            fontSize: RFValue(8),
            color: isFocused ? 'black' : '#B0B0B0',
          }}
        />
      </View>
      <CustomText
        text="This is truly an amazing piece of content! You’ve explained the topic in a very detailed and clear way. The points you highlighted helped me notice some details I hadn’t considered before. Your explanations are straightforward and engaging, making it easy to understand the subject. Also, the examples you provided were very useful in showing real-world applications of the concept. "
        style={{
          fontSize: RFValue(8),
          color: isFocused ? 'black' : '#B0B0B0',
        }}
        ellipsizeMode="tail"
        numberOfLines={3}
      />
    </View>
  );
};
