import Onboarding from '@blazejkustra/react-native-onboarding';
import { type ImageSourcePropType } from 'react-native';
import type { OnboardingStep } from '../../../src/spill-onboarding/types';

const imageMap: Record<string, ImageSourcePropType> = {
  create: require('../../assets/checklist/create.png'),
  share: require('../../assets/checklist/share.png'),
  categorize: require('../../assets/checklist/categorize.png'),
};

const theme = {
  colors: {
    primaryText: '#ffffff',
    secondaryText: '#808080',

    accent: '#787671',
    secondaryAccent: '#555555',

    button: '#d9d8d4',
    buttonText: '#141414',
    buttonPurple: '#6F5BFB',
    buttonPurpleAccent: '#5928FB',
    disabled: '#121212',
    shadow: 'rgba(255, 255, 255, 0.1)',

    background: '#1F1F1F',
    hoverBackground: '#2A2A2A',
    pressedBackground: '#191919',
    reverseBackGround: '#E0E0E0',
    secondaryBackground: '#323232',
    tertiaryBackground: '#3F3F3F',

    violet: '#5F5DFF',
    lightPurple: '#7270FF',
    purpleAccent: '#A5A3FF',
    white: '#ffffff',
  },
} as const;

export default function OnboardingChecklist() {
  const pages = [
    {
      key: 'create',
      text: 'You can create unlimited lists for any occasion',
      title: 'Create Shopping Lists',
    },
    {
      key: 'share',
      text: 'Share and update your lists in real-time with friends and family',
      title: 'Share Lists with Others',
    },
    {
      key: 'categorize',
      text: 'Organize items by categories like dairy, vegetables or meat',
      title: 'Categorize your Items',
    },
  ];

  const steps: OnboardingStep[] = pages.map((page, index) => ({
    title: page.title,
    description: page.text,
    buttonLabel: 'Continue',
    image: imageMap[page.key] as ImageSourcePropType,
    position: index === 0 ? ('top' as const) : ('bottom' as const),
  }));

  return (
    <Onboarding
      introPanel={{
        title: 'The Right Way to do',
        subtitle: 'Shopping lists',
        button: 'Get Started',
      }}
      steps={steps}
      onComplete={() => {}}
      onSkip={() => {}}
      showCloseButton={true}
      showBackButton={true}
      wrapInModalOnWeb={true}
      animationDuration={500}
      colors={{
        background: {
          primary: theme.colors.buttonPurple,
          secondary: theme.colors.background,
          label: theme.colors.secondaryAccent,
          accent: theme.colors.violet,
        },
        text: {
          primary: theme.colors.primaryText,
          secondary: theme.colors.secondaryText,
          contrast: theme.colors.white,
        },
      }}
    />
  );
}
