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

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<RootTabParamList>();

export type RootStackParamList = {
  TabNavigator: undefined;
  Movie: undefined;
  Comments: undefined;
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
    <GestureHandlerRootView>
      <NavigationContainer>
        <View style={{height, width}}>
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
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
