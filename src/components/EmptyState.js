import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONT_SIZE, SPACING } from '../constants/theme';

function EmptyState({ variant = 'empty' }) {
  const isFilterEmpty = variant === 'filter';

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="playlist-add-check"
        size={72}
        color={COLORS.emptyIcon}
      />
      <Text style={styles.heading}>
        {isFilterEmpty ? 'No tasks match this filter' : 'No tasks yet'}
      </Text>
      <Text style={styles.subtext}>
        {isFilterEmpty
          ? 'Try a different filter.'
          : 'Tap + to add your first task.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: SPACING.md,
  },
  subtext: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.dateSubLabel,
    marginTop: SPACING.sm,
  },
});

export default EmptyState;
