import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

const PRIORITIES = [
  { key: 'low', label: 'Low', color: COLORS.priorityLow },
  { key: 'medium', label: 'Medium', color: COLORS.priorityMedium },
  { key: 'high', label: 'High', color: COLORS.priorityHigh },
];

function PrioritySelector({ value, onChange }) {
  return (
    <View style={styles.container}>
      {PRIORITIES.map((p) => {
        const isSelected = value === p.key;
        return (
          <TouchableOpacity
            key={p.key}
            style={[
              styles.pill,
              isSelected && {
                backgroundColor: p.color,
                borderColor: 'transparent',
              },
            ]}
            onPress={() => onChange(p.key)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.text,
                isSelected ? styles.textSelected : styles.textUnselected,
                isSelected && { color: COLORS.surface },
              ]}
            >
              {p.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  pill: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  text: {
    fontSize: 14,
  },
  textSelected: {
    fontWeight: '700',
    color: COLORS.surface,
  },
  textUnselected: {
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
});

export default PrioritySelector;
