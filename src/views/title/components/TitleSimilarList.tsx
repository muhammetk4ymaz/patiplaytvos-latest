import React from 'react';
import {StyleSheet} from 'react-native';
import HorizontalScrollableList from '../../../components/HorizontalScrollableList';
import {scaledPixels} from '../../../helpers/scaledPixels';

type Props = {};

const TitleSimilarList = (props: Props) => {
  const imagePaths2 = [
    'https://image.tmdb.org/t/p/w500//lHe8iwM4Cdm6RSEiara4PN8ZcBd.jpg',
    'https://image.tmdb.org/t/p/w500/9faGSFi5jam6pDWGNd0p8JcJgXQ.jpg',
    'https://image.tmdb.org/t/p/w500/20eIP9o5ebArmu2HxJutaBjhLf4.jpg',
  ];

  return (
    <HorizontalScrollableList
      additionalOffset={scaledPixels(76)}
      listTitle="Similar"
      imagePaths={imagePaths2}
      aspectRatio={16 / 9}
      viewableItems={5}
    />
  );
};

export default TitleSimilarList;

const styles = StyleSheet.create({});
