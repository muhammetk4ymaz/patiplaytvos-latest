import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {textStyles} from '../../constants/TextStyle';
import {
  DefaultFocus,
  SpatialNavigationFocusableView,
  SpatialNavigationNode,
  SpatialNavigationRoot,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {scaledPixels} from '../../helpers/scaledPixels';
import {theme} from '../../theme/theme';
import {Button} from '../../components/Button';
import {RootStackParamList} from '../../../App';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  setAudioTrack,
  setSubtitleIndex,
} from '../../redux/features/videoplayer/videoplayerSlice';

type Props = {};

const SubtitleAndAudioView = (props: Props) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const audioTrackList = useAppSelector(
    state => state.videoplayer.audioTrackList,
  );
  const audioTrack = useAppSelector(state => state.videoplayer.audioTrack);
  const textTrackList = useAppSelector(
    state => state.videoplayer.textTrackList,
  );
  const subtitleIndex = useAppSelector(
    state => state.videoplayer.subtitleIndex,
  );

  const dispatch = useAppDispatch();

  const [audio, setAudio] = React.useState<number>(audioTrack);
  const [subtitle, setSubtitle] = React.useState<number>(subtitleIndex);

  return (
    <SpatialNavigationRoot isActive={isFocused}>
      <SpatialNavigationNode>
        <SpatialNavigationView
          direction="vertical"
          style={{
            width: '100%',
            height: '100%',
            paddingHorizontal: theme.sizes.view.horizontalPadding,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <SpatialNavigationView direction="horizontal">
              <SpatialNavigationView
                direction="vertical"
                style={{flex: 1, gap: theme.sizes.view.rowGap}}>
                <CustomText
                  text={'Seslendirme'}
                  style={textStyles().modalTitle}
                />
                <FlatList
                  data={audioTrackList}
                  contentContainerStyle={{gap: 12, paddingVertical: 5}}
                  renderItem={({item}) => {
                    return (
                      <SpatialNavigationFocusableView
                        onSelect={() => {
                          setAudio(item.index!);
                        }}
                        viewProps={{
                          isTVSelectable: true,
                        }}
                        children={({isFocused}) => (
                          <View
                            style={{
                              flexDirection: 'row',
                              gap: theme.sizes.view.columnGap,
                              alignItems: 'center',
                              width: '30%',
                              borderRadius: scaledPixels(16),
                              padding: scaledPixels(18),
                              backgroundColor: isFocused ? 'white' : '#212121',
                            }}>
                            <IconMaterialCommunityIcons
                              name="check"
                              size={RFValue(12)}
                              color={
                                audio === item.index
                                  ? isFocused
                                    ? 'black'
                                    : 'white'
                                  : isFocused
                                  ? 'white'
                                  : '#212121'
                              }
                            />
                            <CustomText
                              text={item.language || ''}
                              style={{
                                color: isFocused ? 'black' : 'white',
                                fontSize: theme.typography.xs,
                                fontWeight: '400',
                              }}
                            />
                          </View>
                        )}></SpatialNavigationFocusableView>
                    );
                  }}
                />
              </SpatialNavigationView>
              <SpatialNavigationView
                direction="vertical"
                style={{flex: 1, gap: theme.sizes.view.rowGap}}>
                <CustomText
                  text={'Alt yazılar'}
                  style={textStyles().modalTitle}
                />
                <FlatList
                  data={textTrackList}
                  contentContainerStyle={{gap: 12, paddingVertical: 5}}
                  renderItem={({item}) => {
                    return (
                      <SpatialNavigationFocusableView
                        onSelect={() => {
                          setSubtitle(item.index!);
                        }}
                        viewProps={{
                          isTVSelectable: true,
                        }}
                        children={({isFocused}) => (
                          <View
                            style={{
                              flexDirection: 'row',
                              gap: theme.sizes.view.columnGap,
                              alignItems: 'center',
                              width: '30%',
                              borderRadius: scaledPixels(16),
                              padding: scaledPixels(18),
                              backgroundColor: isFocused ? 'white' : '#212121',
                            }}>
                            <IconMaterialCommunityIcons
                              name="check"
                              size={RFValue(12)}
                              color={
                                subtitle === item.index
                                  ? isFocused
                                    ? 'black'
                                    : 'white'
                                  : isFocused
                                  ? 'white'
                                  : '#212121'
                              }
                            />
                            <CustomText
                              text={item.language || ''}
                              style={{
                                color: isFocused ? 'black' : 'white',
                                fontSize: theme.typography.xs,
                                fontWeight: '400',
                              }}
                            />
                          </View>
                        )}></SpatialNavigationFocusableView>
                    );
                  }}
                />
              </SpatialNavigationView>
            </SpatialNavigationView>
          </View>
          <SpatialNavigationView
            direction="horizontal"
            style={{
              padding: scaledPixels(20),
              justifyContent: 'flex-end',
              gap: theme.sizes.view.columnGap,
            }}>
            <Button
              label="İptal"
              onSelect={() => {
                navigation.goBack();
              }}
            />
            <DefaultFocus>
              <Button
                label="Uygula"
                onSelect={() => {
                  dispatch(setAudioTrack(audio));
                  dispatch(setSubtitleIndex(subtitle));
                  navigation.goBack();
                }}
              />
            </DefaultFocus>
          </SpatialNavigationView>
        </SpatialNavigationView>
      </SpatialNavigationNode>
    </SpatialNavigationRoot>
  );
};

export default SubtitleAndAudioView;

const styles = StyleSheet.create({});
