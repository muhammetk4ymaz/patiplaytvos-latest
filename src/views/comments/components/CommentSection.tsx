import {ReactNode, useState} from 'react';
import {Platform, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  DefaultFocus,
  SpatialNavigationFocusableView,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import {CommentContent} from './Comment';

const CommentSection = () => {
  return (
    <View style={{gap: Platform.select({ios: 48, android: 32})}}>
      <CommentContent />
      <CommentLikeButton
        likes={100}
        isLiked={true}
        isDisliked={false}
        endpoint="endpoint"
        id={1}
      />
    </View>
  );
};

export default CommentSection;

type CommentLikeButtonProps = {
  likes: number;
  isLiked: boolean;
  isDisliked: boolean;
  id: number;
  endpoint: string;
};

export const CommentLikeButton = (props: CommentLikeButtonProps) => {
  const [liked, setLiked] = useState(props.isLiked);
  const [disliked, setDisliked] = useState(props.isDisliked);
  const [likes, setLikes] = useState(props.likes);

  const handleLike = async () => {
    // const response = await networkService.post(
    //   `title/api/${props.endpoint}-like/`,
    //   // 'title/api/company-comment-like/',
    //   {
    //     type: 'like',
    //     comment: props.id,
    //     uuid: props.id,
    //   },
    // );
    // console.log('Like', response.data);
    // if (response.status === 200) {
    //   setLiked(!liked);
    //   if (disliked) {
    //     await handleDislike();
    //   }
    // }
    // if (response.data.action === 'create') {
    //   setLikes(likes + 1);
    // } else {
    //   setLikes(likes - 1);
    // }
  };

  const handleDislike = async () => {
    // const response = await networkService.post(
    //   `title/api/${props.endpoint}-dislike/`,
    //   {
    //     type: 'dislike',
    //     comment: props.id,
    //     uuid: props.id,
    //   },
    // );
    // console.log('Dislike', response.data);
    // if (response.status === 200) {
    //   setDisliked(!disliked);
    //   if (liked) {
    //     await handleLike();
    //   }
    // }
  };
  return (
    <SpatialNavigationView
      direction="horizontal"
      style={{
        alignItems: 'center',
        gap: Platform.select({ios: 12, android: 8}),
      }}>
      <DefaultFocus>
        <SpatialNavigationFocusableView
          additionalOffset={1000}
          viewProps={{
            isTVSelectable: true,
          }}
          onSelect={async () => {
            await handleLike();
          }}
          children={({isFocused}) => (
            <IconButton
              isFocused={isFocused}
              icon={
                <IconAntDesign
                  name={liked ? 'like1' : 'like2'}
                  color={isFocused ? 'black' : 'white'}
                  size={RFValue(8)}
                />
              }
            />
          )}></SpatialNavigationFocusableView>
      </DefaultFocus>

      <SpatialNavigationFocusableView
        viewProps={{
          isTVSelectable: true,
        }}
        additionalOffset={1000}
        onSelect={async () => {
          await handleDislike();
        }}
        children={({isFocused}) => (
          <IconButton
            isFocused={isFocused}
            icon={
              <IconAntDesign
                name={disliked ? 'dislike1' : 'dislike2'}
                color={isFocused ? 'black' : 'white'}
                size={RFValue(8)}
                style={{transform: [{scaleX: -1}]}}
              />
            }
          />
        )}></SpatialNavigationFocusableView>
      <SpatialNavigationFocusableView
        viewProps={{
          isTVSelectable: true,
        }}
        onSelect={async () => {
          await handleDislike();
        }}
        additionalOffset={1000}
        children={({isFocused}) => (
          <IconButton
            isFocused={isFocused}
            icon={
              <IconMaterialCommunityIcons
                name={'exclamation'}
                color={isFocused ? 'black' : 'white'}
                size={RFValue(8)}
              />
            }
          />
        )}></SpatialNavigationFocusableView>
    </SpatialNavigationView>
  );
};

const IconButton = ({
  isFocused,
  icon,
}: {
  isFocused: boolean;
  icon: ReactNode;
}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        padding: Platform.select({ios: 12, android: 8}),
        borderRadius: 99,
        backgroundColor: isFocused ? 'white' : '#212121',
      }}>
      {icon}
    </View>
  );
};
