import Onboarding from 'react-native-onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'OnboardingDefault'>;

const STORAGE_KEY = 'onboarding_finished';

export default function OnboardingDefault({ navigation }: Props) {
  return (
    <Onboarding
      animationDuration={300}
      introPanel={{
        title: 'Your private AI mind.',
        subtitle: 'In your pocket.',
        button: 'Get Started',
        image: require('../../assets/logo.png'),
      }}
      steps={[
        {
          label: 'Offline AI access',
          title: 'Chat with AI models offline',
          description:
            'Interact with AI models securely and offline on your mobile device.',
          buttonLabel: 'Got it, next',
          image: require('../../assets/onboarding/step_chat.png'),
          position: 'top',
        },
        {
          label: 'Performance tests',
          title: 'Benchmark your models',
          description:
            'Easily test out how AI models perform while being benchmarked.',
          buttonLabel: 'Nice, next',
          image: require('../../assets/onboarding/step_benchmark.png'),
          position: 'bottom',
        },
        {
          label: 'AI RAG',
          title: 'Add source documents',
          description:
            'Use extra files to extend models knowledge and responses.',
          buttonLabel: 'Great, next',
          image: require('../../assets/onboarding/step_sources.png'),
          position: 'top',
        },
        {
          label: 'Speech to text',
          title: 'Use voice instead of chat',
          description:
            'Use voice messages that automatically transcript into text.',
          buttonLabel: 'Awesome, next',
          image: require('../../assets/onboarding/step_voice.png'),
          position: 'top',
        },
        {
          label: 'Custom models',
          title: 'Upload extra models',
          description: 'Add your own custom models compatible with ExecuTorch.',
          buttonLabel: 'Start chatting',
          image: require('../../assets/onboarding/step_models.png'),
          position: 'bottom',
        },
      ]}
      onComplete={async () => {
        await AsyncStorage.setItem(STORAGE_KEY, 'true');
        navigation.goBack();
      }}
      onSkip={() => {
        navigation.goBack();
      }}
      onStepChange={() => {}}
      showCloseButton
      showBackButton
    />
  );
}
