import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Switch,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { addDays, startOfDay } from 'date-fns';
import { useTasks } from '../hooks/useTasks';
import FormInput from '../components/FormInput';
import PrioritySelector from '../components/PrioritySelector';
import { COLORS, FONT_SIZE, SPACING } from '../constants/theme';
import { formatDueDateFull, isPastDate, parseDueDate } from '../utils/dateHelpers';

function getDefaultDueDate() {
  return addDays(new Date(), 1);
}

function TaskFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const task = route.params?.task;
  const isEdit = !!task;

  const { addTask, editTask } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(getDefaultDueDate());
  const [priority, setPriority] = useState('medium');
  const [isCompleted, setIsCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      const parsed = parseDueDate(task.dueDate);
      setDueDate(parsed || getDefaultDueDate());
      setPriority(task.priority || 'medium');
      setIsCompleted(task.isCompleted || false);
    }
  }, [task]);

  function validate() {
    const next = {};
    if (!title.trim()) next.title = 'Title is required';
    if (isPastDate(dueDate)) next.dueDate = 'Due date cannot be in the past';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSave() {
    if (saving) return;
    if (!validate()) return;

    setSaving(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate instanceof Date ? dueDate.toISOString() : dueDate,
        priority,
        isCompleted: isEdit ? isCompleted : false,
      };

      const result = isEdit
        ? await editTask(task.id, payload)
        : await addTask(payload);

      if (result?.success) {
        navigation.goBack();
      }
    } finally {
      setSaving(false);
    }
  }

  function onDateChange(_, selectedDate) {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDueDate(selectedDate);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
        >
          <MaterialIcons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEdit ? 'Edit Task' : 'New Task'}
        </Text>
        <TouchableOpacity
          onPress={handleSave}
          disabled={saving}
          style={styles.headerButton}
        >
          {saving ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : (
            <Text style={styles.saveText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 40 + insets.bottom },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <FormInput
          label="TITLE"
          value={title}
          onChangeText={setTitle}
          placeholder="Task title"
          error={errors.title}
        />

        <FormInput
          label="DESCRIPTION"
          value={description}
          onChangeText={setDescription}
          placeholder="Add a description (optional)"
          multiline
          numberOfLines={4}
        />

        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>DUE DATE</Text>
          <TouchableOpacity
            style={[styles.dateRow, errors.dueDate && styles.dateRowError]}
            onPress={() => setShowDatePicker(true)}
          >
            <MaterialIcons
              name="event"
              size={22}
              color={COLORS.textSecondary}
            />
            <Text style={styles.dateText}>
              {formatDueDateFull(
                dueDate instanceof Date ? dueDate.toISOString() : dueDate
              ) || 'Select date'}
            </Text>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={COLORS.dateSubLabel}
            />
          </TouchableOpacity>
          {errors.dueDate ? (
            <Text style={styles.errorText}>{errors.dueDate}</Text>
          ) : null}
        </View>

        {showDatePicker && (
          <View style={styles.datePickerWrapper}>
            <DateTimePicker
              value={dueDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
              minimumDate={startOfDay(new Date())}
            />
            {Platform.OS === 'ios' && (
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>PRIORITY</Text>
          <PrioritySelector value={priority} onChange={setPriority} />
        </View>

        {isEdit && (
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Mark as complete</Text>
            <Switch
              value={isCompleted}
              onValueChange={setIsCompleted}
              trackColor={{
                false: COLORS.border,
                true: COLORS.primary,
              }}
              thumbColor={COLORS.surface}
            />
          </View>
        )}

        <TouchableOpacity
          style={[styles.submitButton, saving && styles.submitDisabled]}
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.8}
        >
          {saving ? (
            <ActivityIndicator size="small" color={COLORS.surface} />
          ) : (
            <Text style={styles.submitText}>
              {isEdit ? 'Save Changes' : 'Create Task'}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    paddingTop: Platform.OS === 'ios' ? SPACING.xl : SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  saveText: {
    fontSize: FONT_SIZE.body,
    fontWeight: '700',
    color: COLORS.primary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: 40,
  },
  fieldWrapper: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    padding: 14,
    gap: SPACING.sm,
  },
  dateRowError: {
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  datePickerWrapper: {
    marginBottom: SPACING.md,
  },
  doneButton: {
    paddingVertical: SPACING.sm,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: FONT_SIZE.body,
    fontWeight: '600',
    color: COLORS.primary,
  },
  dateText: {
    flex: 1,
    fontSize: FONT_SIZE.body,
    color: COLORS.textPrimary,
  },
  errorText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  toggleLabel: {
    fontSize: FONT_SIZE.body,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  submitDisabled: {
    opacity: 0.7,
  },
  submitText: {
    fontSize: FONT_SIZE.body,
    fontWeight: '700',
    color: COLORS.surface,
  },
});

export default TaskFormScreen;
