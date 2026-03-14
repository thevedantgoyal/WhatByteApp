import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '../constants/theme';

function SearchBar({ value, onChangeText, placeholder = 'Search...', onFocus, onBlur }) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={20} color={COLORS.surface} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.searchPlaceholder}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.headerOverlayLight,
    borderRadius: RADIUS.xl,
    height: 40,
    paddingHorizontal: SPACING.md,
    marginHorizontal: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZE.body,
    color: COLORS.surface,
    marginLeft: SPACING.sm,
  },
});

export default SearchBar;
