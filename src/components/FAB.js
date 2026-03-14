import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SHADOW } from '../constants/theme';

function FAB({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.fab}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <MaterialIcons name="add" size={28} color={COLORS.surface} />
      <MaterialIcons
        name="edit"
        size={16}
        color={COLORS.surface}
        style={styles.pencil}
      />
    </TouchableOpacity>
  );
}

const FAB_SIZE = 56;

const styles = StyleSheet.create({
  fab: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOW.fab,
  },
  pencil: {
    position: 'absolute',
    bottom: 6,
    right: 6,
  },
});

export default FAB;
