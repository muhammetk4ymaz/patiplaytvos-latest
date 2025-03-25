import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, useWindowDimensions, View} from 'react-native';
import {RootStackParamList} from '../../../App';
import {
  DefaultFocus,
  SpatialNavigationFocusableView,
  SpatialNavigationView,
} from 'react-tv-space-navigation';
import {theme} from '../../theme/theme';
import Video from 'react-native-video';
import CustomText from '../CustomText';
import {scaledPixels} from '../../helpers/scaledPixels';
import {RFValue} from 'react-native-responsive-fontsize';
import {Button} from '../Button';
import IconButton from '../IconButton';

const MainTitle = () => {
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <SpatialNavigationView
      direction="vertical"
      style={{
        height: height,
        width: width,
        backgroundColor: theme.colors.view.background,
        justifyContent: 'center',
        paddingHorizontal: theme.sizes.view.horizontalPadding,
        gap: theme.sizes.view.rowGap,
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
          fontSize: RFValue(8),
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
              navigation.navigate('Movie');
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

export default MainTitle;
