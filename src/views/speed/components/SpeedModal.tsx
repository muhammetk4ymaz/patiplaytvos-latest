import {useState} from 'react';
import {View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  DefaultFocus,
  SpatialNavigationFocusableView,
  SpatialNavigationNode,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import CustomText from '../../../components/CustomText';
import CustomDrawerModal from '../../../components/Modal/CustomDrawerModal';
import ModalItem from '../../../components/Modal/ModalItem';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {theme} from '../../../theme/theme';
import {setSpeed} from '../../../redux/features/videoplayer/videoplayerSlice';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../../App';

const SpeedModal = () => {
  const speed = useAppSelector(state => state.videoplayer).speed;

  return (
    <CustomDrawerModal title="Video Speed">
      <SpatialNavigationView
        direction="vertical"
        style={{
          gap: theme.sizes.list.rowGap,
        }}>
        {speedOptions.map((option, index) => {
          if (option.value === speed) {
            return (
              <DefaultFocus key={index}>
                <SpeedOptionItem option={option} />
              </DefaultFocus>
            );
          } else {
            return <SpeedOptionItem option={option} key={index} />;
          }
        })}
      </SpatialNavigationView>
    </CustomDrawerModal>
  );
};

export default SpeedModal;

const speedOptions = [
  {
    value: 0.25,
    label: '0.25x',
  },
  {
    value: 0.5,
    label: '0.5x',
  },
  {
    value: 0.75,
    label: '0.75x',
  },
  {
    value: 1,
    label: 'Normal',
  },
  {
    value: 1.25,
    label: '1.25x',
  },
  {
    value: 1.5,
    label: '1.5x',
  },
  {
    value: 1.75,
    label: '1.75x',
  },
  {
    value: 2,
    label: '2x',
  },
];

type SpeedOptionItemProps = {
  option: {
    value: number;
    label: string;
  };
};

const SpeedOptionItem = (props: SpeedOptionItemProps) => {
  const speed = useAppSelector(state => state.videoplayer).speed;
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <SpatialNavigationFocusableView
      onSelect={() => {
        dispatch(setSpeed(props.option.value));
        navigation.goBack();
      }}
      viewProps={{
        isTVSelectable: true,
      }}
      children={({isFocused}) => (
        <ModalItem isFocused={isFocused}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <CustomText
              text={props.option.label}
              style={{
                fontSize: theme.typography.xs,
                color: isFocused ? 'black' : 'white',
                fontWeight: '400',
              }}
            />
            {speed === props.option.value && (
              <IconMaterialCommunityIcons
                name="check"
                size={RFValue(12)}
                color={isFocused ? 'black' : 'white'}
              />
            )}
          </View>
        </ModalItem>
      )}
    />
  );
};
