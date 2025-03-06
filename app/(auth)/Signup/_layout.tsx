import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './index';

const Stack = createStackNavigator();

const Layout: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signup"
        component={Index}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Layout;
