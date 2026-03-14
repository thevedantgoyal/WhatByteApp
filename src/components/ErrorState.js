import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONT_SIZE, SPACING } from '../constants/theme';

function ErrorState({ message, onRetry }) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="error-outline" size={64} color={COLORS.error} />
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  message: {
    fontSize: FONT_SIZE.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
  retryButton: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: 12,
  },
  retryText: {
    fontSize: FONT_SIZE.body,
    fontWeight: '700',
    color: COLORS.surface,
  },
});

export default ErrorState;
