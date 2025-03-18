import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  SpatialNavigationRoot,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import {useIsFocused} from '@react-navigation/native';

type Props = {};

const TitleView = (props: Props) => {
  const focused = useIsFocused();

  return (
    <SpatialNavigationRoot isActive={focused}>
      <SpatialNavigationView direction={'vertical'} style={{flex: 1}}>
        <View></View>
      </SpatialNavigationView>
    </SpatialNavigationRoot>
  );
};

export default TitleView;

const styles = StyleSheet.create({});
