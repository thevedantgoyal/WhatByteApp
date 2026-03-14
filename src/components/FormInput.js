import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '../constants/theme';

function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  error,
  editable = true,
  rightElement,
  numberOfLines = 4,
}) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <TextInput
          style={[styles.input, multiline && styles.inputMultiline]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.dateSubLabel}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : undefined}
          editable={editable}
        />
        {rightElement ? (
          <View style={styles.rightElement}>{rightElement}</View>
        ) : null}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.inputBackground,
    borderRadius: RADIUS.input,
    padding: SPACING.md,
    minHeight: 48,
  },
  inputError: {
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZE.body,
    color: COLORS.textPrimary,
    padding: 0,
  },
  inputMultiline: {
    minHeight: 88,
    textAlignVertical: 'top',
  },
  rightElement: {
    marginLeft: SPACING.sm,
  },
  errorText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
});

export default FormInput;
