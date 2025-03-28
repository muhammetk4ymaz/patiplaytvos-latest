import React from 'react';
import {StyleSheet} from 'react-native';
import HorizontalScrollableList from '../../../components/HorizontalScrollableList';
import {scaledPixels} from '../../../helpers/scaledPixels';

type Props = {};

const TitleRelatedList = (props: Props) => {
  const imagePaths2 = [
    'https://image.tmdb.org/t/p/w500/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg',
    'https://image.tmdb.org/t/p/w500/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg',
    'https://image.tmdb.org/t/p/w500/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg',
    'https://image.tmdb.org/t/p/w500/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg',
    'https://image.tmdb.org/t/p/w500/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg',
  ];

  return (
    <HorizontalScrollableList
      additionalOffset={scaledPixels(76)}
      listTitle="Related"
      imagePaths={imagePaths2}
      aspectRatio={16 / 9}
      viewableItems={5}
    />
  );
};

export default TitleRelatedList;

const styles = StyleSheet.create({});
