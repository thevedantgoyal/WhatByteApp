import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AuthLogo from '../components/AuthLogo';
import { COLORS, FONT_SIZE, SPACING } from '../constants/theme';

const { width, height } = Dimensions.get('window');
const PURPLE_SHAPE_SIZE = 280;
const ARROW_BUTTON_SIZE = 56;

function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AuthLogo />
        <Text style={styles.title}>Get things done.</Text>
        <Text style={styles.subtitle}>
          Just a click away from planning your tasks.
        </Text>
        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotInactive]} />
          <View style={[styles.dot, styles.dotInactive]} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>
      </View>

      <TouchableOpacity
        style={styles.purpleCorner}
        onPress={() => navigation.navigate('Register')}
        activeOpacity={0.9}
      >
        <View style={styles.purpleShape} />
        <View style={styles.arrowWrapper}>
          <MaterialIcons
            name="arrow-forward"
            size={28}
            color={COLORS.surface}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  content: {
    paddingTop: height * 0.12,
    paddingHorizontal: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: SPACING.lg,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: FONT_SIZE.body,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    textAlign: 'left',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.sm,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dotInactive: {
    backgroundColor: 'transparent',
  },
  purpleCorner: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: PURPLE_SHAPE_SIZE,
    height: PURPLE_SHAPE_SIZE,
  },
  purpleShape: {
    position: 'absolute',
    right: -PURPLE_SHAPE_SIZE * 0.4,
    bottom: -PURPLE_SHAPE_SIZE * 0.4,
    width: PURPLE_SHAPE_SIZE,
    height: PURPLE_SHAPE_SIZE,
    borderRadius: PURPLE_SHAPE_SIZE / 2,
    backgroundColor: COLORS.primary,
  },
  arrowWrapper: {
    position: 'absolute',
    right: SPACING.xl,
    bottom: SPACING.xxl + 20,
    width: ARROW_BUTTON_SIZE,
    height: ARROW_BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
