import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import {
  SpatialNavigationRoot,
  SpatialNavigationScrollView,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import CustomText from '../../components/CustomText';
import {scaledPixels} from '../../helpers/scaledPixels';
import {theme} from '../../theme/theme';
import TitleEpisodesList from './components/TitleEpisodesList';
import TitleHeader from './components/TitleHeader';
import TitleClipsList from './components/TitleClipsList';
import TitleTrailerList from './components/TitleTrailerList';
import {textStyles} from '../../constants/TextStyle';
import CircleAvatar from '../../components/CircleAvatar';

const {width, height} = Dimensions.get('window');

type Props = {};

const TitleView = (props: Props) => {
  const focused = useIsFocused();

  return (
    <SpatialNavigationRoot isActive={focused}>
      <SpatialNavigationScrollView>
        <TitleBackdropSection />
        <View style={{height: height * 0.5}}></View>
        <View
          style={{
            paddingHorizontal: theme.sizes.view.horizontalPadding,
            marginBottom: scaledPixels(40),
          }}>
          <TitleHeader />
          <TitleWarningText />
        </View>

        <TitleEpisodesList />
        <TitleClipsList />

        <TitleTrailerList />

        <View
          style={{
            backgroundColor: 'red',
            marginVertical: theme.sizes.view.rowGap,
            marginLeft: theme.sizes.view.horizontalPadding,
            gap: theme.sizes.view.rowGap,
          }}>
          <CustomText text={'Company'} style={textStyles().listTitle} />
          <SpatialNavigationView
            direction="horizontal"
            style={{gap: theme.sizes.view.columnGap}}>
            <CircleAvatar
              size={scaledPixels(100)}
              source="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Warner_Bros._logo_2023.svg/440px-Warner_Bros._logo_2023.svg.png"
            />
            <CircleAvatar
              size={scaledPixels(100)}
              source="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Img-ayyapim-487-1-900x580.jpg/440px-Img-ayyapim-487-1-900x580.jpg"
            />
          </SpatialNavigationView>
        </View>

        <View
          style={{
            height: height,
          }}
        />
      </SpatialNavigationScrollView>
    </SpatialNavigationRoot>
  );
};

export default TitleView;

const styles = StyleSheet.create({});

const TitleBackdropSection = () => {
  return (
    <>
      <Video
        source={require('../../../assets/CivilWar.mp4')}
        style={[
          StyleSheet.absoluteFillObject,
          {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          },
        ]}
        volume={0}
        repeat={true}
      />
      <LinearGradient
        colors={[
          'rgba(0,0,0,0)',
          'rgba(0,0,0,0)',
          'rgba(0,0,0,1)',

          'rgba(0,0,0,1)',
          'rgba(0,0,0,1)',
          'rgba(0,0,0,1)',
          'rgba(0,0,0,1)',
        ]}
        style={[StyleSheet.absoluteFillObject]}
      />
    </>
  );
};

const TitleWarningText = () => {
  return (
    <CustomText
      text="This work involves nudity, strong language, and suicide."
      style={{
        color: 'white',
        opacity: 0.5,
        paddingLeft: scaledPixels(200) + 12,
        fontSize: theme.typography['2xs'],
      }}
    />
  );
};
