import { useCallback, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';
import { useFocusEffect } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const STORAGE_KEY = 'onboarding_finished';

export default function Home({ navigation }: Props) {
  const [finished, setFinished] = useState<boolean | null>(null);

  const load = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      setFinished(value === 'true');
    } catch {
      setFinished(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Onboarding - Example</Text>
      <Text style={styles.subtitle}>
        Finished: {finished === null ? 'loading...' : finished ? 'Yes' : 'No'}
      </Text>

      <View style={styles.actions}>
        <Button
          title="Open Default Onboarding"
          onPress={() => navigation.navigate('OnboardingDefault')}
        />
        <View style={styles.spacer} />
        <Button
          title="Custom Intro"
          onPress={() => navigation.navigate('OnboardingCustomIntro')}
        />
        <View style={styles.spacer} />
        <Button
          title="Custom Steps"
          onPress={() => navigation.navigate('OnboardingCustomSteps')}
        />
        <View style={styles.spacer} />
        <Button
          title="Custom Theme"
          onPress={() => navigation.navigate('OnboardingCustomTheme')}
        />
        <View style={styles.spacer} />
        <Button
          title="Gradient Background"
          onPress={() => navigation.navigate('OnboardingGradient')}
        />
        <View style={styles.spacer} />
        <Button
          title="Checklist Onboarding"
          onPress={() => navigation.navigate('OnboardingChecklist')}
        />
      </View>

      <View style={styles.footer}>
        <Button
          title="Reset Finished Flag"
          onPress={async () => {
            await AsyncStorage.removeItem(STORAGE_KEY);
            load();
          }}
        />
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <View style={{ height: 12 }} />
        <Button title="Refresh Status" onPress={load} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  actions: {
    marginTop: 24,
  },
  spacer: { height: 12 },
  footer: { marginTop: 24 },
});
