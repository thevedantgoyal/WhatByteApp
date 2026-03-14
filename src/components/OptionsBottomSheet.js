import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONT_SIZE, SPACING } from '../constants/theme';
import { signOutUser } from '../services/authService';

function OptionsBottomSheet({ visible, onClose }) {
  const insets = useSafeAreaInsets();

  function handleLogout() {
    onClose();
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await signOutUser();
          },
        },
      ]
    );
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={[styles.sheet, { paddingBottom: insets.bottom + SPACING.lg }]} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handle} />
          <TouchableOpacity
            style={styles.optionRow}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <MaterialIcons name="logout" size={22} color={COLORS.error} />
            <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    alignSelf: 'center',
    marginBottom: SPACING.lg,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  optionText: {
    fontSize: FONT_SIZE.body,
    fontWeight: '600',
    color: COLORS.error,
    marginLeft: SPACING.md,
  },
});

export default OptionsBottomSheet;
