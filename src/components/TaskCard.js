import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONT_SIZE, RADIUS, SPACING } from '../constants/theme';
import { formatDueDate, isOverdue } from '../utils/dateHelpers';
import TaskDetailModal from './TaskDetailModal';

const ORANGE_TAGS = ['personal', 'work', 'app'];
function getTagStyle(tag) {
  const lower = (tag || '').toLowerCase();
  return ORANGE_TAGS.includes(lower) ? COLORS.tagOrange : COLORS.tagPurpleOpaque;
}

function getPriorityColor(priority) {
  switch ((priority || '').toLowerCase()) {
    case 'high':
      return COLORS.priorityHigh;
    case 'medium':
      return COLORS.priorityMedium;
    case 'low':
      return COLORS.priorityLow;
    default:
      return COLORS.textSecondary;
  }
}

function getTaskTags(task) {
  const tags = [];
  if (task.category) tags.push(task.category);
  if (task.tags && Array.isArray(task.tags)) tags.push(...task.tags);
  if (tags.length === 0 && task.priority) tags.push(task.priority);
  return tags;
}

function TaskCard({ task, onToggle, onEdit, onDelete, embedded }) {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const taskTags = getTaskTags(task);
  const showOverdue =
    !task.isCompleted && task.dueDate && isOverdue(task.dueDate);

  function handlePress() {
    setShowTaskModal(true);
  }

  return (
    <>
      <TaskDetailModal
        visible={showTaskModal}
        task={task}
        onClose={() => setShowTaskModal(false)}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <TouchableOpacity
      style={[
        styles.card,
        task.isCompleted && styles.cardCompleted,
        embedded && styles.cardEmbedded,
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <TouchableOpacity
        onPress={() => onToggle(task.id, task.isCompleted)}
        style={styles.checkboxWrap}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        {task.isCompleted ? (
          <View style={styles.checkboxChecked}>
            <MaterialCommunityIcons name="check" size={14} color={COLORS.surface} />
          </View>
        ) : (
          <View style={styles.checkboxUnchecked} />
        )}
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text
            style={[styles.title, task.isCompleted && styles.titleStrike]}
            numberOfLines={1}
          >
            {task.title}
          </Text>
          {taskTags.length > 0 && (
            <View style={styles.tagsRow}>
              {taskTags.map((tag, i) => {
                const p = (tag || '').toLowerCase();
                const isPriority = p === 'high' || p === 'medium' || p === 'low';
                const bgColor = isPriority ? getPriorityColor(tag) : getTagStyle(tag);
                return (
                  <View
                    key={i}
                    style={[styles.tag, { backgroundColor: bgColor }]}
                  >
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>
        <View style={styles.footer}>
          <Text style={styles.date}>
            {formatDueDate(task.dueDate) || 'No date'}
          </Text>
          {showOverdue && (
            <Text style={styles.overdue}>Overdue</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginBottom: SPACING.sm,
    borderWidth: 0,
    overflow: 'hidden',
    shadowColor: COLORS.shadowBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardEmbedded: {
    marginHorizontal: 0,
    marginBottom: 0,
  },
  cardCompleted: {
    opacity: 0.5,
  },
  checkboxWrap: {
    marginRight: SPACING.sm,
  },
  checkboxUnchecked: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: FONT_SIZE.body,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginRight: SPACING.sm,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  titleStrike: {
    textDecorationLine: 'line-through',
    color: COLORS.dateSubLabel,
  },
  tag: {
    borderRadius: RADIUS.pill,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '600',
    color: COLORS.surface,
    textTransform: 'capitalize',
  },
  footer: { flexDirection: 'row', alignItems: 'center', marginTop: SPACING.xs },
  date: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.dateSubLabel,
  },
  overdue: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.overdue,
    marginLeft: SPACING.sm,
  },
});

export default TaskCard;
