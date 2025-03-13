import React, {useRef} from 'react';
import {Image, StyleSheet, useWindowDimensions, View} from 'react-native';
import Video from 'react-native-video';
import {
  DefaultFocus,
  SpatialNavigationFocusableView,
  SpatialNavigationScrollView,
  SpatialNavigationView,
  SpatialNavigationVirtualizedListRef,
} from 'react-tv-space-navigation';
import {Button} from '../../components/Button';
import CustomText from '../../components/CustomText';
import HorizontalScrollableList from '../../components/HorizontalScrollableList';
import IconButton from '../../components/IconButton';
import {useMenuContext} from '../../components/Menu/MenuContext';
import {Page} from '../../components/Page';
import {scaledPixels} from '../../helpers/scaledPixels';
import {theme} from '../../theme/theme';

const HomeView = () => {
  const {isOpen: isMenuOpen} = useMenuContext();
  console.log('Home', 'isMenuOpen', isMenuOpen);
  const imagePaths = [
    'https://a.ltrbxd.com/resized/film-poster/8/5/0/4/5/9/850459-alien-romulus-0-2000-0-3000-crop.jpg?v=acabb7fd83',
    'https://a.ltrbxd.com/resized/film-poster/9/7/9/9/1/5/979915-sweet-dreams-0-2000-0-3000-crop.jpg?v=62fce59ed',
    // 'https://a.ltrbxd.com/resized/film-poster/7/3/9/4/5/1/r739451-flow-0-2000-0-3000-crop.jpg?v=642df44cbc',
    'https://a.ltrbxd.com/resized/film-poster/8/5/0/4/5/9/850459-alien-romulus-0-2000-0-3000-crop.jpg?v=acabb7fd83',
    'https://a.ltrbxd.com/resized/film-poster/9/7/9/9/1/5/979915-sweet-dreams-0-2000-0-3000-crop.jpg?v=62fce59ed',
    'https://a.ltrbxd.com/resized/film-poster/7/3/9/4/5/1/739451-flow-0-2000-0-3000-crop.jpg?v=642df44cbc',
    'https://a.ltrbxd.com/resized/film-poster/8/5/0/4/5/9/850459-alien-romulus-0-2000-0-3000-crop.jpg?v=acabb7fd83',
    'https://a.ltrbxd.com/resized/film-poster/9/7/9/9/1/5/979915-sweet-dreams-0-2000-0-3000-crop.jpg?v=62fce59ed',
    'https://a.ltrbxd.com/resized/film-poster/7/3/9/4/5/1/739451-flow-0-2000-0-3000-crop.jpg?v=642df44cbc',
    'https://a.ltrbxd.com/resized/film-poster/8/5/0/4/5/9/850459-alien-romulus-0-2000-0-3000-crop.jpg?v=acabb7fd83',
  ];
  const imagePaths2 = [
    'https://mir-s3-cdn-cf.behance.net/project_modules/hd/6d0ddf18393841.562c8bd34c8f4.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/hd/6d0ddf18393841.562c8bd34c8f4.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/hd/6d0ddf18393841.562c8bd34c8f4.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/hd/6d0ddf18393841.562c8bd34c8f4.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/hd/6d0ddf18393841.562c8bd34c8f4.jpg',
  ];

  const title1Ref = useRef<SpatialNavigationVirtualizedListRef | null>(null);
  const title2Ref = useRef<SpatialNavigationVirtualizedListRef | null>(null);
  const keepEnjoyRef = useRef<SpatialNavigationVirtualizedListRef | null>(null);

  return (
    <Page>
      <SpatialNavigationScrollView offsetFromStart={scaledPixels(76)}>
        <MainTitle />

        <HorizontalScrollableList
          listTitle="Title 1"
          imagePaths={imagePaths}
          aspectRatio={2 / 3}
          viewableItems={8}
          parentRef={title1Ref}
        />

        <HorizontalScrollableList
          listTitle="Title 2"
          imagePaths={imagePaths}
          aspectRatio={2 / 3}
          viewableItems={8}
          parentRef={title2Ref}
        />

        <HorizontalScrollableList
          listTitle="Keep Enjoying"
          imagePaths={imagePaths2}
          aspectRatio={16 / 9}
          viewableItems={5}
          parentRef={keepEnjoyRef}
        />

        <View
          style={{
            height: scaledPixels(1000),
          }}
        />
      </SpatialNavigationScrollView>
    </Page>
  );
};

export default HomeView;

const MainTitle = () => {
  const {height, width} = useWindowDimensions();
  return (
    <SpatialNavigationView
      direction="vertical"
      style={{
        height: height,
        width: width,
        backgroundColor: theme.colors.view.background,
        justifyContent: 'center',
        paddingHorizontal: theme.sizes.view.horizontalPadding,
        gap: theme.sizes.view.gap,
      }}>
      <Video
        source={require('../../../assets/CivilWar.mp4')}
        style={StyleSheet.absoluteFillObject}
        volume={0}
        repeat={true}
      />
      <View
        style={{
          width: scaledPixels(350),
          aspectRatio: 16 / 9,
        }}>
        <Image
          source={require('../../../assets/boluk.webp')}
          resizeMode="stretch"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <CustomText
        numberOfLines={3}
        text="Film, bir askerin kışın meşakkatli yollarını aştığı dokunaklı bir hikayeyi anlatır. Farklı yerlerden gelen bu askerlerin, askeri hayata uyum sağlamaları gerekmektedir. Rüyaları, hedefleri, korkuları ve hırsları olan bu genç erkekler, karşılarına çıkan zorluklara rağmen kendilerini geliştirmeyi öğreneceklerdir. Bu sadece bir savaş hikayesi değil, aynı zamanda kişisel gelişim, dayanışma ve olgunlaşma hikayesidir. Genç askerler, sivil hayattan askeri hayata geçişin"
        style={{
          color: 'white',
          width: '50%',
          fontSize: scaledPixels(24),
          fontWeight: '500',
        }}
      />

      <SpatialNavigationView
        style={{flexDirection: 'row', alignItems: 'center', gap: 12}}
        direction="horizontal">
        <DefaultFocus>
          <Button
            label="Enjoy Now"
            additionalOffset={1000}
            onSelect={() => {
              console.log('Enjoy Now');
            }}
          />
        </DefaultFocus>

        <SpatialNavigationFocusableView
          viewProps={{isTVSelectable: true}}
          additionalOffset={10000}
          onSelect={() => {
            console.log('MaterialCommunityIcons');
          }}
          children={({isFocused, isActive, isRootActive}) => {
            return (
              <IconButton
                onSelect={() => {
                  console.log('MaterialCommunityIcons');
                }}
                additionalOffset={10000}
                icon="information-outline"
                iconSize={scaledPixels(40)}
              />
            );
          }}></SpatialNavigationFocusableView>
      </SpatialNavigationView>
    </SpatialNavigationView>
  );
};
