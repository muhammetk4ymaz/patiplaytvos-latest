import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import {
  SpatialNavigationFocusableView,
  SpatialNavigationNode,
  SpatialNavigationRoot,
  SpatialNavigationScrollView,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import CircleAvatar from '../../components/CircleAvatar';
import CustomText from '../../components/CustomText';
import {textStyles} from '../../constants/TextStyle';
import {scaledPixels} from '../../helpers/scaledPixels';
import {theme} from '../../theme/theme';
import TitleClipsList from './components/TitleClipsList';
import TitleEpisodesList from './components/TitleEpisodesList';
import TitleHeader from './components/TitleHeader';
import TitleTrailerList from './components/TitleTrailerList';
import InfoCard from '../../components/Custom/InfoCard';
import TitleSimilarList from './components/TitleSimilarList';
import TitleRelatedList from './components/TitleRelatedList';

const {width, height} = Dimensions.get('window');

type Props = {};

const TitleView = (props: Props) => {
  const focused = useIsFocused();

  return (
    <SpatialNavigationRoot isActive={focused}>
      <SpatialNavigationScrollView
        contentContainerStyle={{gap: theme.sizes.view.rowGap}}>
        <TitleBackdropSection />
        <View style={{height: height * 0.6}}></View>
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

        <SpatialNavigationNode>
          {({isActive}) => (
            <View
              style={{
                marginLeft: theme.sizes.view.horizontalPadding,
                gap: theme.sizes.view.rowGap,
              }}>
              <CustomText
                text={'Company'}
                style={textStyles(isActive).listTitle}
              />
              <SpatialNavigationView
                direction="horizontal"
                style={{gap: theme.sizes.list.columnGap}}>
                <SpatialNavigationFocusableView
                  additionalOffset={theme.sizes.additionalOffset.listItem}>
                  <CircleAvatar
                    size={scaledPixels(100)}
                    source="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Warner_Bros._logo_2023.svg/440px-Warner_Bros._logo_2023.svg.png"
                  />
                </SpatialNavigationFocusableView>
                <SpatialNavigationFocusableView>
                  <CircleAvatar
                    size={scaledPixels(100)}
                    source="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Img-ayyapim-487-1-900x580.jpg/440px-Img-ayyapim-487-1-900x580.jpg"
                  />
                </SpatialNavigationFocusableView>
              </SpatialNavigationView>
            </View>
          )}
        </SpatialNavigationNode>
        <SpatialNavigationNode>
          {({isActive}) => (
            <View
              style={{
                marginLeft: theme.sizes.view.horizontalPadding,
                gap: theme.sizes.view.rowGap,
              }}>
              <CustomText
                text={'Cast'}
                style={textStyles(isActive).listTitle}
              />
              <SpatialNavigationView
                direction="horizontal"
                style={{gap: theme.sizes.list.columnGap}}>
                <SpatialNavigationFocusableView
                  additionalOffset={theme.sizes.additionalOffset.listItem}>
                  <InfoCard title="Kit Harington" subtitle="Jon Snow" />
                </SpatialNavigationFocusableView>

                <InfoCard title="Emilia Clarke" subtitle="Daenerys Targaryen" />
                <InfoCard title="Peter Dinklage" subtitle="N/A" />
              </SpatialNavigationView>
            </View>
          )}
        </SpatialNavigationNode>
        <SpatialNavigationNode>
          {({isActive}) => (
            <View
              style={{
                marginLeft: theme.sizes.view.horizontalPadding,
                gap: theme.sizes.view.rowGap,
              }}>
              <CustomText
                text={'Crew'}
                style={textStyles(isActive).listTitle}
              />
              <SpatialNavigationView
                direction="horizontal"
                style={{gap: theme.sizes.list.columnGap}}>
                <SpatialNavigationFocusableView
                  additionalOffset={theme.sizes.additionalOffset.listItem}>
                  <InfoCard title="David Benioff" subtitle="Director" />
                </SpatialNavigationFocusableView>
              </SpatialNavigationView>
            </View>
          )}
        </SpatialNavigationNode>
        <SpatialNavigationNode>
          {({isActive}) => (
            <View
              style={{
                marginLeft: theme.sizes.view.horizontalPadding,
                gap: theme.sizes.view.rowGap,
              }}>
              <CustomText
                text={'Fans'}
                style={textStyles(isActive).listTitle}
              />
              <SpatialNavigationView
                direction="horizontal"
                style={{gap: theme.sizes.list.columnGap}}>
                <SpatialNavigationFocusableView
                  additionalOffset={theme.sizes.additionalOffset.listItem}>
                  <CircleAvatar size={scaledPixels(100)} />
                </SpatialNavigationFocusableView>

                <CircleAvatar size={scaledPixels(100)} />
              </SpatialNavigationView>
            </View>
          )}
        </SpatialNavigationNode>

        <SpatialNavigationNode>
          {({isActive}) => (
            <View
              style={{
                marginLeft: theme.sizes.view.horizontalPadding,
                gap: theme.sizes.view.rowGap,
              }}>
              <CustomText
                text={'Audio'}
                style={textStyles(isActive).listTitle}
              />
              <SpatialNavigationView
                direction="horizontal"
                style={{gap: theme.sizes.list.columnGap}}>
                <SpatialNavigationFocusableView
                  additionalOffset={theme.sizes.additionalOffset.listItem}>
                  <InfoCard title="English" />
                </SpatialNavigationFocusableView>
              </SpatialNavigationView>
            </View>
          )}
        </SpatialNavigationNode>

        <SpatialNavigationNode>
          {({isActive}) => (
            <View
              style={{
                marginLeft: theme.sizes.view.horizontalPadding,
                gap: theme.sizes.view.rowGap,
              }}>
              <CustomText
                text={'Subtitle'}
                style={textStyles(isActive).listTitle}
              />
              <SpatialNavigationView
                direction="horizontal"
                style={{gap: theme.sizes.list.columnGap}}>
                <SpatialNavigationFocusableView
                  additionalOffset={theme.sizes.additionalOffset.listItem}>
                  <InfoCard title="English" />
                </SpatialNavigationFocusableView>
              </SpatialNavigationView>
            </View>
          )}
        </SpatialNavigationNode>

        <TitleRelatedList />
        <TitleSimilarList />

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
          'rgba(0,0,0,0.5)',
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
        color: theme.colors.text.third,
        paddingLeft: scaledPixels(200) + 12,
        fontSize: theme.typography['2xs'],
      }}
    />
  );
};
