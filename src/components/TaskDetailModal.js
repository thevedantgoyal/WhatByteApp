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
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '../constants/theme';

function TaskDetailModal({ visible, task, onClose, onEdit, onDelete }) {
  if (!task) return null;

  const statusStr = task.isCompleted ? 'Complete' : 'Incomplete';
  const statusBg = task.isCompleted ? COLORS.priorityLow : COLORS.dateSubLabel;

  function handleEdit() {
    onClose();
    onEdit(task);
  }

  function handleDelete() {
    onClose();
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete(task.id) },
      ]
    );
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.content} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title} numberOfLines={2}>{task.title}</Text>
          <View style={[styles.badge, { backgroundColor: statusBg }]}>
            <Text style={styles.badgeText}>{statusStr}</Text>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={handleEdit}>
              <MaterialIcons name="edit" size={20} color={COLORS.primary} />
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleDelete}>
              <MaterialIcons name="delete" size={20} color={COLORS.error} />
              <Text style={[styles.buttonText, { color: COLORS.error }]}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  content: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.lg,
    width: '100%',
    maxWidth: 340,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.pill,
    marginBottom: SPACING.lg,
  },
  badgeText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.surface,
  },
  buttons: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.inputBackground,
  },
  buttonText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: SPACING.xs,
  },
});

export default TaskDetailModal;
