import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Onboarding from '@blazejkustra/react-native-onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'OnboardingCustomIntro'
>;

const STORAGE_KEY = 'onboarding_finished';

function CustomIntro({ onPressStart }: { onPressStart: () => void }) {
  return (
    <View style={styles.introContainer}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.h1}>Private AI, Personalized</Text>
      <Text style={styles.h2}>Tap to begin your journey</Text>
      <TouchableOpacity onPress={onPressStart} style={styles.cta}>
        <Text style={styles.ctaText}>Dive In</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function OnboardingCustomIntro({ navigation }: Props) {
  return (
    <Onboarding
      colors={{
        background: {
          primary: '#0EA5E9',
          secondary: '#0B1220',
          label: '#111827',
          accent: '#0EA5E9',
        },
        text: {
          primary: '#E5E7EB',
          secondary: 'rgba(229,231,235,0.7)',
          contrast: 'white',
        },
      }}
      fonts="System"
      introPanel={CustomIntro}
      steps={[
        {
          title: 'Your data stays with you',
          description: 'We never send your prompts to external servers.',
          buttonLabel: 'Next',
          image: require('../../assets/onboarding/step_chat.png'),
          position: 'top',
        },
        {
          title: 'Optimized for device',
          description: 'Experience low-latency responses on-device.',
          buttonLabel: 'Next',
          image: require('../../assets/onboarding/step_benchmark.png'),
          position: 'bottom',
        },
        {
          title: 'You decide how it works',
          description: 'Customize models and knowledge sources freely.',
          buttonLabel: 'Let’s go',
          image: require('../../assets/onboarding/step_sources.png'),
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
      showBackButton={false}
    />
  );
}

const styles = StyleSheet.create({
  introContainer: { gap: 12, marginTop: 16 },
  logo: { alignSelf: 'flex-start' },
  h1: { fontSize: 24, fontWeight: '800', color: '#E5E7EB' },
  h2: { fontSize: 16, color: 'rgba(229,231,235,0.7)' },
  cta: {
    marginTop: 12,
    backgroundColor: '#0EA5E9',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  ctaText: { color: '#0B1220', fontWeight: '700' },
});
