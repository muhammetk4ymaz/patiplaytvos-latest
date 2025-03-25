import React, {useRef} from 'react';
import {View} from 'react-native';
import {
  SpatialNavigationScrollView,
  SpatialNavigationVirtualizedListRef,
} from 'react-tv-space-navigation';
import MainTitle from '../../components/Custom/MainTitle';
import HorizontalScrollableList from '../../components/HorizontalScrollableList';
import {useMenuContext} from '../../components/Menu/MenuContext';
import {Page} from '../../components/Page';
import {scaledPixels} from '../../helpers/scaledPixels';

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

        <HorizontalScrollableList
          listTitle="Title 2"
          imagePaths={imagePaths}
          aspectRatio={2 / 3}
          viewableItems={8}
          parentRef={title2Ref}
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
