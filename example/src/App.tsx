import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import Home from './screens/Home';
import OnboardingDefault from './screens/OnboardingDefault';
import OnboardingCustomIntro from './screens/OnboardingCustomIntro';
import OnboardingCustomSteps from './screens/OnboardingCustomSteps';
import OnboardingCustomTheme from './screens/OnboardingCustomTheme';
import OnboardingGradient from './screens/OnboardingGradient';
import OnboardingChecklist from './screens/OnboardingChecklist';

enableScreens(true);

export type RootStackParamList = {
  Home: undefined;
  OnboardingDefault: undefined;
  OnboardingCustomIntro: undefined;
  OnboardingCustomSteps: undefined;
  OnboardingCustomTheme: undefined;
  OnboardingGradient: undefined;
  OnboardingChecklist: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Example App' }}
        />
        <Stack.Screen
          name="OnboardingDefault"
          component={OnboardingDefault}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardingCustomIntro"
          component={OnboardingCustomIntro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardingCustomSteps"
          component={OnboardingCustomSteps}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardingCustomTheme"
          component={OnboardingCustomTheme}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardingGradient"
          component={OnboardingGradient}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardingChecklist"
          component={OnboardingChecklist}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
