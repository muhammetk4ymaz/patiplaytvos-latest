import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  DefaultFocus,
  SpatialNavigationRoot,
  SpatialNavigationScrollView,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import {Button} from '../../components/Button';
import VerticalPoster from '../../components/Custom/VerticalPoster';
import CustomText from '../../components/CustomText';
import HorizontalScrollableList from '../../components/HorizontalScrollableList';
import {scaledPixels} from '../../helpers/scaledPixels';
import {theme} from '../../theme/theme';
import {ScrollView} from 'react-native';

const {width, height} = Dimensions.get('window');

type Props = {};

const TitleView = (props: Props) => {
  const focused = useIsFocused();

  const imagePaths2 = [
    'https://mir-s3-cdn-cf.behance.net/project_modules/hd/6d0ddf18393841.562c8bd34c8f4.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/hd/6d0ddf18393841.562c8bd34c8f4.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/hd/6d0ddf18393841.562c8bd34c8f4.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/hd/6d0ddf18393841.562c8bd34c8f4.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/hd/6d0ddf18393841.562c8bd34c8f4.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/hd/6d0ddf18393841.562c8bd34c8f4.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/hd/6d0ddf18393841.562c8bd34c8f4.jpg',
  ];

  const arr = new Array(20).fill(1).map((_, i) => i * 2);

  return (
    <SpatialNavigationRoot isActive={focused}>
      <SpatialNavigationScrollView>
        <SpatialNavigationView
          direction={'vertical'}
          style={{
            height: height,
            width: width,
            backgroundColor: 'red',
            justifyContent: 'flex-end',
            gap: scaledPixels(73),
            // paddingBottom: theme.sizes.view.rowGap,
          }}>
          <TitleBackdropSection />
          <View
            style={{
              paddingHorizontal: theme.sizes.view.horizontalPadding,
            }}>
            <TitleHeader />
            <CustomText
              text="This work involves nudity, strong language, and suicide."
              style={{
                color: 'white',
                opacity: 0.5,
                paddingLeft: scaledPixels(200) + 12,
                fontSize: theme.typography['2xs'],
              }}
            />
          </View>

          <HorizontalScrollableList
            listTitleComponent={
              <View
                style={{
                  height: scaledPixels(40) + 2 * theme.sizes.list.rowGap,
                }}>
                <SpatialNavigationScrollView horizontal>
                  <SpatialNavigationView
                    direction="horizontal"
                    style={{
                      paddingHorizontal: theme.sizes.view.horizontalPadding,
                      gap: theme.sizes.list.columnGap,
                    }}>
                    {arr.map(index => (
                      <Button
                        label={'Season ' + index}
                        key={index}
                        additionalOffset={theme.sizes.view.rowGap}
                      />
                    ))}
                  </SpatialNavigationView>
                </SpatialNavigationScrollView>
              </View>
            }
            additionalOffset={scaledPixels(40) + 3 * theme.sizes.list.rowGap}
            listTitleHeight={scaledPixels(40) + 2 * theme.sizes.list.rowGap}
            imagePaths={imagePaths2}
            aspectRatio={16 / 9}
            viewableItems={5}
          />
        </SpatialNavigationView>

        <HorizontalScrollableList
          additionalOffset={scaledPixels(76)}
          listTitle="Clips"
          imagePaths={imagePaths2}
          aspectRatio={2 / 3}
          viewableItems={8}
        />
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
      <Image
        source={require('../../../assets/gameofhronesbackground.jpg')}
        resizeMode="cover"
        style={StyleSheet.absoluteFillObject}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.75)', 'rgba(0,0,0,1)']}
        style={[StyleSheet.absoluteFillObject]}
      />
    </>
  );
};

const TitleHeader = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 12,
          width: width * 0.6,
        }}>
        <VerticalPoster
          width={scaledPixels(200)}
          url={
            'https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg'
          }
        />
        <View style={{flex: 1, justifyContent: 'space-around'}}>
          <CustomText
            text="Game of Thrones"
            weight="bold"
            style={{
              color: 'white',
              fontSize: theme.typography.sm,
            }}
          />

          <View>
            <CustomText
              text="DE, JP • Action, Comedy, Drama"
              style={{
                color: 'white',
                opacity: 0.5,
                fontSize: theme.typography['2xs'],
              }}
            />

            <CustomText
              text="2008 - Present • 8 Seasons"
              style={{
                color: 'white',
                opacity: 0.5,
                fontSize: theme.typography['2xs'],
              }}
            />
          </View>

          <CustomText
            text="Marvel is dedicated to delivering great stories, characters, and experiences to fans worldwide. We value inclusivity, respect, and safety. Therefore, we reserve the right to hide, delete, block, or report any inappropriate content on this account or page."
            style={{
              color: 'white',
              opacity: 0.5,
              fontSize: theme.typography['2xs'],
            }}
          />
        </View>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <DefaultFocus>
          <Button label="Button" additionalOffset={1000} />
        </DefaultFocus>
      </View>
    </View>
  );
};
