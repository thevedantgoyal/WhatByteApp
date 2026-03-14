import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import AuthLogo from '../components/AuthLogo';
import AuthInput from '../components/AuthInput';
import useAuth from '../hooks/useAuth';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '../constants/theme';

const SOCIAL_ICONS = [
  { name: 'facebook', color: COLORS.socialFacebook },
  { name: 'google', color: COLORS.socialGoogle },
  { name: 'apple', color: COLORS.socialApple },
];

function RegisterScreen({ navigation }) {
  const { register, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error) clearError();
  }, [email, password, error, clearError]);

  async function handleRegister() {
    await register(email, password);
  }

  function handleSocialPress() {
    Toast.show({ type: 'info', text1: 'Coming soon' });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <AuthLogo />
        </View>
        <Text style={styles.title}>Let's get started!</Text>

        <AuthInput
          label="EMAIL"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          editable={!loading}
        />
        <AuthInput
          label="PASSWORD"
          value={password}
          onChangeText={setPassword}
          placeholder="Create a password (min 6 characters)"
          secureTextEntry={!showPassword}
          error={error}
          editable={!loading}
          rightIcon={{
            component: (
              <MaterialCommunityIcons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color={COLORS.textSecondary}
              />
            ),
          }}
          onRightIconPress={() => setShowPassword(!showPassword)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.surface} />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or sign up with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          {SOCIAL_ICONS.map((icon, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.socialButton, { backgroundColor: icon.color }]}
              onPress={handleSocialPress}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name={icon.name}
                size={24}
                color={COLORS.surface}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
          >
            <Text style={styles.footerLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.sm,
    minHeight: 50,
  },
  buttonText: {
    fontSize: FONT_SIZE.body,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginHorizontal: SPACING.md,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SPACING.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  footerText: {
    fontSize: FONT_SIZE.body,
    color: COLORS.textSecondary,
  },
  footerLink: {
    fontSize: FONT_SIZE.body,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
