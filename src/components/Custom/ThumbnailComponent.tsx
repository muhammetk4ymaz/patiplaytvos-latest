import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FocusablePoster from './FocusablePoster';
import ProgressIndicator from './ProgressIndicator';

type Props = {
  url: string;
  width: number;
  isFocused: boolean;
  percentage: number;
  runtime: number;
  description?: React.ReactNode;
};

const ThumbnailComponent = (props: Props) => {
  return (
    <FocusablePoster
      url={props.url}
      width={props.width}
      aspectRatio={16 / 9}
      isFocused={props.isFocused}>
      <View>
        <ProgressIndicator
          percentage={props.percentage}
          runtime={props.runtime}
          isFocused={props.isFocused}
        />
        {props.description}
      </View>
    </FocusablePoster>
  );
};

export default ThumbnailComponent;

const styles = StyleSheet.create({});
