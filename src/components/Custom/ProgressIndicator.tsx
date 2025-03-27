import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import {theme} from '../../theme/theme';

type Props = {
  percentage: number;
  runtime: number;
  progressColor?: ['#080808', '#080808'] | ['#8b5cf6', '#a855f7'];
  isFocused: boolean;
};

const ProgressIndicator = (props: Props) => {
  return (
    <View style={{gap: 12}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingHorizontal: 12,
        }}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.7)',
            paddingVertical: 2,
            paddingHorizontal: 8,
            borderRadius: 4,
          }}>
          <CustomText
            text={formatDuration(props.runtime)}
            style={{
              color: 'white',
              fontSize: RFValue(6),
              opacity: props.isFocused ? 1 : 0.5,
            }}
          />
        </View>
      </View>
      <View>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: 'darkgray',
            },
          ]}></View>
        <LinearGradient
          colors={props.progressColor || ['#8b5cf6', '#a855f7']}
          style={{
            height: 6,
            width: `${props.percentage}%`,
          }}></LinearGradient>
      </View>
    </View>
  );
};

export default ProgressIndicator;

const styles = StyleSheet.create({});

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let formattedTime = '';

  if (hours > 0) {
    formattedTime += `${hours}h `;
  }
  if (minutes > 0) {
    formattedTime += `${minutes}m `;
  }

  if (hours === 0 || minutes === 0) {
    if (remainingSeconds !== 0) {
      formattedTime += `${remainingSeconds}s`;
    }
  }

  return formattedTime.trim();
}
