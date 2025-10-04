/* eslint-disable react/no-unstable-nested-components */
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Onboarding from '@blazejkustra/react-native-onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'OnboardingCustomSteps'
>;

const STORAGE_KEY = 'onboarding_finished';

type StepRenderProps = {
  onNext: () => void;
  onBack: () => void;
  isLast: boolean;
};

function StepCard({
  title,
  description,
  onNext,
  onBack,
  isLast,
}: StepRenderProps & { title: string; description: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDesc}>{description}</Text>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={onBack}
          style={[styles.btn, styles.btnGhost]}
        >
          <Text style={[styles.btnText, styles.btnTextGhost]}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onNext}
          style={[styles.btn, styles.btnPrimary]}
        >
          <Text style={styles.btnText}>{isLast ? 'Finish' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function OnboardingCustomSteps({ navigation }: Props) {
  return (
    <Onboarding
      colors={{
        background: {
          primary: '#111111',
          secondary: '#ffffff',
          label: '#f2f2f2',
          accent: '#111111',
        },
        text: {
          primary: '#111111',
          secondary: 'rgba(0,0,0,0.6)',
          contrast: '#ffffff',
        },
      }}
      fonts="System"
      animationDuration={400}
      introPanel={{
        title: 'Using custom renderers for steps',
        button: 'Start',
      }}
      steps={[
        {
          component: (p) => (
            <StepCard
              {...p}
              title="Step 1"
              description="This step uses a custom card component with custom buttons."
            />
          ),
          image: require('../../assets/onboarding/step_chat.png'),
          position: 'top',
        },
        {
          component: (p) => (
            <StepCard
              {...p}
              title="Step 2"
              description="We can change layout fully, independent of built-in step panel. Long description to test the layout. Long description to test the layout. Long description to test the layout. Long description to test the layout."
            />
          ),
          image: require('../../assets/onboarding/step_benchmark.png'),
          position: 'bottom',
        },
        {
          component: (p) => (
            <StepCard
              {...p}
              title="Step 3"
              description="Finish will call onComplete from the screen handler."
            />
          ),
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  cardTitle: { fontSize: 24, fontWeight: '800', color: '#111' },
  cardDesc: { fontSize: 18, color: 'rgba(0,0,0,0.7)' },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  btn: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10 },
  btnPrimary: { backgroundColor: '#111' },
  btnGhost: { borderWidth: 1, borderColor: '#111' },
  btnText: { color: '#fff', fontWeight: '700' },
  btnTextGhost: { color: '#111', fontWeight: '700' },
});
