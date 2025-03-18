import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {
  SpatialNavigationRoot,
  SpatialNavigationView,
} from 'react-tv-space-navigation';

import CustomDrawerModal from '../../components/Modal/CustomDrawerModal';
import MovieWithModal from '../../components/MovieWithModal';
import CommentSection from '../comments/components/CommentSection';
import {View} from 'react-native';
import HorizontalScrollableList from '../../components/HorizontalScrollableList';

const EpisodesView = () => {
  const isFocused = useIsFocused();
  return (
    <SpatialNavigationRoot isActive={isFocused}>
      <SpatialNavigationView
        direction="vertical"
        style={{
          width: '100%',
          height: '100%',
        }}>
        <MovieWithModal children={<EpisodeModal />} direction="vertical" />
      </SpatialNavigationView>
    </SpatialNavigationRoot>
  );
};

export default EpisodesView;

const EpisodeModal = () => {
  const imagePaths2 = [
    'https://mir-s3-cdn-cf.behance.net/project_modules/hd/6d0ddf18393841.562c8bd34c8f4.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/hd/6d0ddf18393841.562c8bd34c8f4.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/hd/6d0ddf18393841.562c8bd34c8f4.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/hd/6d0ddf18393841.562c8bd34c8f4.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/hd/6d0ddf18393841.562c8bd34c8f4.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/hd/6d0ddf18393841.562c8bd34c8f4.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/hd/6d0ddf18393841.562c8bd34c8f4.jpg',
  ];

  return (
    <CustomDrawerModal direction="vertical">
      <HorizontalScrollableList
        listTitle="Episodes"
        imagePaths={imagePaths2}
        aspectRatio={16 / 9}
        viewableItems={5}
      />
    </CustomDrawerModal>
  );
};
