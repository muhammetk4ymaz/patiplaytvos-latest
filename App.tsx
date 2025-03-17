import React from 'react';

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useWindowDimensions, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Menu} from './src/components/Menu/Menu';
import {MenuProvider} from './src/components/Menu/MenuContext';
import './src/components/configureRemoteControl';
import {theme} from './src/theme/theme';
import CommentsView from './src/views/comments';
import HomeView from './src/views/home';
import MovieView from './src/views/movie';
import RepliesView from './src/views/replies';
import CommentView from './src/views/comment';
import SpeedView from './src/views/speed';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<RootTabParamList>();

export type RootStackParamList = {
  TabNavigator: undefined;
  Movie: {speed: number};
  Comments: undefined;
  Replies: undefined;
  Comment: undefined;
  Speed: undefined;
};

export type RootTabParamList = {
  Home: undefined;
};
const RenderMenu = (props: BottomTabBarProps) => <Menu {...props} />;

const TabNavigator = () => {
  return (
    <MenuProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          sceneStyle: {
            backgroundColor: theme.colors.view.background,
            marginLeft: theme.sizes.menu.closed,
          },
          tabBarPosition: 'left',
        }}
        tabBar={RenderMenu}
        initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeView} />
      </Tab.Navigator>
    </MenuProvider>
  );
};

const App = () => {
  const {height, width} = useWindowDimensions();

  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: {backgroundColor: theme.colors.view.background},
            }}>
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="Movie" component={MovieView} />
            <Stack.Screen
              name="Comments"
              component={CommentsView}
              options={{
                contentStyle: {},
                presentation: 'containedTransparentModal',
              }}
            />
            <Stack.Screen
              name="Replies"
              component={RepliesView}
              options={{
                contentStyle: {},
                presentation: 'containedTransparentModal',
              }}
            />
            <Stack.Screen
              name="Comment"
              component={CommentView}
              options={{
                contentStyle: {},
                presentation: 'containedTransparentModal',
              }}
            />
            <Stack.Screen
              name="Speed"
              component={SpeedView}
              options={{
                contentStyle: {},
                presentation: 'containedTransparentModal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
