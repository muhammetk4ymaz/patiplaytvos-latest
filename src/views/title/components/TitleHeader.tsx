import {Dimensions, View} from 'react-native';
import VerticalPoster from '../../../components/Custom/VerticalPoster';
import CustomText from '../../../components/CustomText';
import {theme} from '../../../theme/theme';
import {scaledPixels} from '../../../helpers/scaledPixels';
import {DefaultFocus} from 'react-tv-space-navigation';
import {Button} from '../../../components/Button';

const width = Dimensions.get('window').width;

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
                color: theme.colors.text.third,
                fontSize: theme.typography['2xs'],
              }}
            />

            <CustomText
              text="2008 - Present • 8 Seasons"
              style={{
                color: theme.colors.text.third,
                fontSize: theme.typography['2xs'],
              }}
            />
          </View>

          <CustomText
            text="Marvel is dedicated to delivering great stories, characters, and experiences to fans worldwide. We value inclusivity, respect, and safety. Therefore, we reserve the right to hide, delete, block, or report any inappropriate content on this account or page."
            style={{
              color: theme.colors.text.secondary,

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

export default TitleHeader;
