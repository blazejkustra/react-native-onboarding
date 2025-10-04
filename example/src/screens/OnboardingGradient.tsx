/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import Onboarding from '@blazejkustra/react-native-onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'OnboardingGradient'>;

const STORAGE_KEY = 'onboarding_gradient_finished';

function GradientButton({
  text,
  onPress,
  colors,
  start,
  end,
}: {
  text: string;
  onPress: () => void;
  colors: readonly [string, string, ...string[]];
  start: { x: number; y: number };
  end: { x: number; y: number };
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.gradientButton}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        style={styles.gradientButtonInner}
      >
        <Text style={styles.gradientButtonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

function CustomIntroPanel({ onPressStart }: { onPressStart: () => void }) {
  return (
    <View style={styles.introContainer}>
      <View style={styles.introTextContainer}>
        <Text style={styles.introTitle}>Beautiful Gradients</Text>
        <Text style={styles.introSubtitle}>
          Experience onboarding with stunning gradient backgrounds
        </Text>
      </View>
      <View style={styles.introImageContainer}>
        <Text style={styles.introImagePlaceholder}>🎨</Text>
      </View>
      <GradientButton
        text="Get Started"
        onPress={onPressStart}
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </View>
  );
}

function CustomGradientStep({
  onNext,
  onBack,
  label,
  title,
  description,
  buttonText,
  buttonColors,
  buttonStart,
  buttonEnd,
}: {
  onNext: () => void;
  onBack: () => void;
  label: string;
  title: string;
  description: string;
  buttonText: string;
  buttonColors: string[];
  buttonStart: { x: number; y: number };
  buttonEnd: { x: number; y: number };
}) {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.stepTextContainer}>
        <View style={styles.stepLabelBadge}>
          <Text style={styles.stepLabelText}>{label}</Text>
        </View>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepDescription}>{description}</Text>
      </View>
      <View style={styles.stepButtonRow}>
        <View>
          <TouchableOpacity
            onPress={onBack}
            style={styles.backButton}
            activeOpacity={0.8}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.stepNextButton}>
          <GradientButton
            text={buttonText}
            onPress={onNext}
            colors={
              buttonColors as unknown as readonly [string, string, ...string[]]
            }
            start={buttonStart}
            end={buttonEnd}
          />
        </View>
      </View>
    </View>
  );
}

export default function OnboardingGradient({ navigation }: Props) {
  return (
    <Onboarding
      colors={{
        background: {
          primary: '#3D61D6',
          secondary: '#ffffff',
          label: '#e6e7eb',
          accent: '#020f3c',
        },
        text: {
          primary: '#020f3c',
          secondary: 'rgba(2, 15, 60, 0.8)',
          contrast: '#ffffff',
        },
      }}
      fonts="System"
      animationDuration={300}
      background={() => (
        <LinearGradient
          colors={['#667eea', '#764ba2', '#f093fb']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
      )}
      introPanel={({ onPressStart }) => (
        <CustomIntroPanel onPressStart={onPressStart} />
      )}
      steps={[
        {
          component: ({ onNext, onBack }) => (
            <CustomGradientStep
              onNext={onNext}
              onBack={onBack}
              label="Gradient Magic"
              title="Smooth color transitions"
              description="Enjoy beautiful gradient backgrounds that create a modern and engaging experience."
              buttonText="Amazing!"
              buttonColors={['#667eea', '#764ba2', '#f093fb']}
              buttonStart={{ x: 0, y: 0 }}
              buttonEnd={{ x: 1, y: 1 }}
            />
          ),
          image: require('../../assets/onboarding/step_chat.png'),
          position: 'bottom',
        },
        {
          component: ({ onNext, onBack }) => (
            <CustomGradientStep
              onNext={onNext}
              onBack={onBack}
              label="Custom Styling"
              title="Fully customizable"
              description="Use any gradient colors, directions, and effects to match your app's design."
              buttonText="Love it!"
              buttonColors={['#4facfe', '#00f2fe']}
              buttonStart={{ x: 0, y: 0 }}
              buttonEnd={{ x: 1, y: 0 }}
            />
          ),
          image: require('../../assets/onboarding/step_benchmark.png'),
          position: 'bottom',
        },
        {
          component: ({ onNext, onBack }) => (
            <CustomGradientStep
              onNext={onNext}
              onBack={onBack}
              label="Performance"
              title="Optimized rendering"
              description="Gradients are rendered efficiently without impacting your app's performance."
              buttonText="Perfect!"
              buttonColors={['#ff6b6b', '#feca57', '#48dbfb']}
              buttonStart={{ x: 0, y: 0 }}
              buttonEnd={{ x: 1, y: 0 }}
            />
          ),
          image: require('../../assets/onboarding/step_sources.png'),
          position: 'top',
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
      skipButton={({ onPress }) => <SkipButton onPress={onPress} />}
    />
  );
}

// Custom close button component
function SkipButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.skipButton}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['#667eea', '#4facfe']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.closeButtonInner}
      >
        <Text style={styles.closeButtonText}>✕</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Gradient button styles
  gradientButton: {
    height: 48,
    width: '100%',
    overflow: 'hidden',
  },
  gradientButtonInner: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  // Intro panel styles
  introContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    gap: 24,
    alignItems: 'center',
  },
  introTextContainer: {
    alignItems: 'center',
    gap: 16,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#020f3c',
  },
  introSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(2, 15, 60, 0.8)',
  },
  introImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#e6e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  introImagePlaceholder: {
    fontSize: 32,
  },

  // Step component styles
  stepContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    gap: 24,
  },
  stepTextContainer: {
    alignItems: 'center',
    gap: 16,
  },
  stepLabelBadge: {
    backgroundColor: '#e6e7eb',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  stepLabelText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#020f3c',
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#020f3c',
  },
  stepDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(2, 15, 60, 0.8)',
  },
  stepButtonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  stepNextButton: {
    flex: 1,
  },
  backButton: {
    flex: 1,
    height: 48,
    width: 72,
    borderWidth: 1,
    borderColor: '#020f3c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    color: '#020f3c',
  },

  // Close button styles
  skipButton: {
    width: 40,
    height: 40,
    overflow: 'hidden',
  },
  closeButtonInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
});
