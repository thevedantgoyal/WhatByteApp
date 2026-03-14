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


function LoginScreen({ navigation }) {
  const { login, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error) clearError();
  }, [email, password, error, clearError]);

  async function handleLogin() {
    await login(email, password);
  }

  function handleForgotPassword() {
    Toast.show({ type: 'info', text1: 'Coming soon' });
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
        <Text style={styles.title}>Welcome back!</Text>

        <AuthInput
          label="EMAIL"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          editable={!loading}
        />
        <View style={styles.passwordLabelRow}>
          <Text style={styles.label}>PASSWORD</Text>
          <TouchableOpacity
            onPress={handleForgotPassword}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.forgotLink}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <AuthInput
          label=""
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
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
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.surface} />
          ) : (
            <Text style={styles.buttonText}>Log in</Text>
          )}
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or log in with</Text>
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
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            activeOpacity={0.7}
          >
            <Text style={styles.footerLink}>Get started!</Text>
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
  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  forgotLink: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
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
  dividerText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginHorizontal: SPACING.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
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

export default LoginScreen;
