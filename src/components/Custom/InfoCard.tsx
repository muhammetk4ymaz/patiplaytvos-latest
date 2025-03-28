import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../CustomText';
import {theme} from '../../theme/theme';
import {RFValue} from 'react-native-responsive-fontsize';

type Props = {
  title: string;
  subtitle?: string;
};

const InfoCard = (props: Props) => {
  return (
    <View
      style={{
        backgroundColor: theme.colors.patiplay.gray,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
      }}>
      <CustomText
        text={props.title}
        style={{
          color: theme.colors.text.secondary,
          fontSize: theme.typography['2xs'],
        }}
      />
      {props.subtitle && (
        <CustomText
          text={props.subtitle}
          style={{
            color: theme.colors.text.third,
            fontSize: theme.typography['2xs'],
          }}
        />
      )}
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({});
