import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants/theme';

const LOGO_SIZE = 100;

const DECORATIVE_DOTS = [
  { top: 8, left: -12, color: COLORS.tagColors[2].bg, size: 6 },
  { top: -4, right: -8, color: COLORS.tagColors[1].bg, size: 6 },
  { bottom: 14, right: -16, color: COLORS.tagColors[2].bg, size: 5 },
  { bottom: -2, left: -10, color: COLORS.tagColors[3].bg, size: 6 },
  { top: 24, right: -4, color: COLORS.tagColors[4].bg, size: 5 },
  { top: -8, left: 20, color: COLORS.tagColors[5].bg, size: 6 },
  { top: 16, left: -8, color: COLORS.textSecondary, size: 5 },
  { bottom: 8, right: 4, color: COLORS.border, size: 5 },
];

function AuthLogo() {
  return (
    <View style={styles.container}>
      {DECORATIVE_DOTS.map((dot, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor: dot.color,
              width: dot.size,
              height: dot.size,
              borderRadius: dot.size / 2,
              top: dot.top,
              left: dot.left,
              right: dot.right,
              bottom: dot.bottom,
            },
          ]}
        />
      ))}
      <View style={styles.logoBox}>
        <MaterialCommunityIcons
          name="check"
          size={48}
          color={COLORS.surface}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: LOGO_SIZE + 60,
    height: LOGO_SIZE + 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBox: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
  },
});

export default AuthLogo;
