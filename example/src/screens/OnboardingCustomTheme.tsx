import Onboarding from '@blazejkustra/react-native-onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'OnboardingCustomTheme'
>;

const STORAGE_KEY = 'onboarding_finished';

export default function OnboardingCustomTheme({ navigation }: Props) {
  return (
    <Onboarding
      colors={{
        background: {
          primary: '#22c55e',
          secondary: '#f0fdf4',
          label: '#dcfce7',
          accent: '#166534',
        },
        text: {
          primary: '#14532d',
          secondary: 'rgba(20, 83, 45, 0.8)',
          contrast: '#f0fdf4',
        },
      }}
      fonts="System"
      animationDuration={350}
      introPanel={{
        title: 'Green energy vibes',
        subtitle: 'Eco friendly onboarding',
        button: 'Begin',
        image: require('../../assets/logo.png'),
      }}
      steps={[
        {
          label: 'Sustainable',
          title: 'Optimized models',
          description: 'Efficient inference saves power and battery.',
          buttonLabel: 'Next',
          image: require('../../assets/onboarding/step_benchmark.png'),
          position: 'bottom',
        },
        {
          label: 'Harmony',
          title: 'Balanced defaults',
          description: 'Great UX with sensible, configurable options.',
          buttonLabel: 'Next',
          image: require('../../assets/onboarding/step_sources.png'),
          position: 'top',
        },
        {
          label: 'Ready',
          title: 'Get started now',
          description: 'Launch with a clean, eco theme.',
          buttonLabel: 'Finish',
          image: require('../../assets/onboarding/step_models.png'),
          position: 'bottom',
        },
      ]}
      onComplete={async () => {
        await AsyncStorage.setItem(STORAGE_KEY, 'true');
        navigation.goBack();
      }}
      onSkip={() => navigation.goBack()}
      onStepChange={() => {}}
      showCloseButton
      showBackButton
    />
  );
}
