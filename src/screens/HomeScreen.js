import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { signOutUser } from '../services/authService';
import { useTasks } from '../hooks/useTasks';
import { formatHeaderDate } from '../utils/dateHelpers';
import { filterTasks } from '../utils/searchHelper';
import { groupTasksByDate } from '../utils/dateHelpers';
import SwipeableTaskCard from '../components/SwipeableTaskCard';
import EmptyState from '../components/EmptyState';
import OptionsBottomSheet from '../components/OptionsBottomSheet';
import ErrorState from '../components/ErrorState';
import FAB from '../components/FAB';
import SearchBar from '../components/SearchBar';
import { COLORS, FONT_SIZE, SPACING } from '../constants/theme';

function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const {
    tasks,
    filters,
    loading,
    error,
    retry,
    removeTask,
    toggleComplete,
  } = useTasks();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [showOptionsSheet, setShowOptionsSheet] = useState(false);

  const searchFilteredTasks = useMemo(() => {
    return searchQuery.trim() ? filterTasks(searchQuery, tasks) : tasks;
  }, [searchQuery, tasks]);

  const chipFilteredTasks = useMemo(() => {
    return searchFilteredTasks.filter((task) => {
      const matchPriority =
        filters.priority === 'all' || task.priority === filters.priority;
      const matchStatus =
        filters.status === 'all' ||
        (filters.status === 'completed' && task.isCompleted) ||
        (filters.status === 'active' && !task.isCompleted);
      return matchPriority && matchStatus;
    });
  }, [searchFilteredTasks, filters]);

  const groupedTasks = useMemo(() => {
    return groupTasksByDate(chipFilteredTasks);
  }, [chipFilteredTasks]);

  const sections = useMemo(() => {
    const secs = [];
    if ((groupedTasks.today || []).length) {
      secs.push({ title: 'Today', data: groupedTasks.today });
    }
    if ((groupedTasks.tomorrow || []).length) {
      secs.push({ title: 'Tomorrow', data: groupedTasks.tomorrow });
    }
    if ((groupedTasks.thisWeek || []).length) {
      secs.push({ title: 'This week', data: groupedTasks.thisWeek });
    }
    if ((groupedTasks.later || []).length) {
      secs.push({ title: 'Later', data: groupedTasks.later });
    }
    return secs;
  }, [groupedTasks]);

  const totalTasks = sections.reduce((sum, s) => sum + s.data.length, 0);
  const hasTasks = tasks.length > 0;
  const isFilterEmpty = hasTasks && totalTasks === 0;
  const showInitialLoading = loading && !hasTasks && !error;

  function handleEdit(task) {
    navigation.navigate('TaskForm', { task });
  }

  function handleDelete(taskId) {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => removeTask(taskId) },
      ]
    );
  }

  function renderItem({ item }) {
    return (
      <SwipeableTaskCard
        task={item}
        onToggle={toggleComplete}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );
  }

  function renderSectionHeader({ section }) {
    return (
      <Text style={styles.sectionHeader}>{section.title}</Text>
    );
  }

  if (showInitialLoading) {
    return (
      <View style={[styles.container, styles.centerContainer]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error && !loading) {
    return (
      <View style={styles.container}>
        <ErrorState message={error} onRetry={retry} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={[styles.header, { paddingTop: insets.top + SPACING.md }]}>
        <View style={styles.decorativeBlob} />
        <View style={styles.headerColumn}>
          <View style={styles.headerRow1}>
            <MaterialIcons name="apps" size={28} color={COLORS.surface} />
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <TouchableOpacity
              style={styles.moreButton}
              onPress={() => setShowOptionsSheet(true)}
            >
              <MaterialIcons name="more-horiz" size={24} color={COLORS.surface} />
            </TouchableOpacity>
          </View>
        {searchFocused && !searchQuery.trim() && (
          <Text style={styles.searchHint}>
            Try: "high", "completed", "low incomplete", "meeting"
          </Text>
        )}
        <Text style={styles.dateLabel}>{formatHeaderDate()}</Text>
        <Text style={styles.title}>My tasks</Text>
        </View>
      </View>

      {totalTasks === 0 ? (
        <EmptyState variant={isFilterEmpty ? 'filter' : 'empty'} />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: 100 + (Platform.OS === 'ios' ? insets.bottom : 0) },
          ]}
          showsVerticalScrollIndicator={true}
        />
      )}

      <OptionsBottomSheet
        visible={showOptionsSheet}
        onClose={() => setShowOptionsSheet(false)}
      />

      <View
        style={[
          styles.tabBar,
          { height: 64 + insets.bottom, paddingBottom: insets.bottom },
        ]}
      >
        <TouchableOpacity style={styles.tabItem}>
          <MaterialIcons name="tune" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.fabWrapper}>
          <FAB onPress={() => navigation.navigate('TaskForm')} />
        </View>
        <TouchableOpacity style={styles.tabItem}>
          <MaterialIcons name="calendar-today" size={24} color={COLORS.dateSubLabel} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.screenBg,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    position: 'relative',
    overflow: 'hidden',
  },
  decorativeBlob: {
    position: 'absolute',
    bottom: -60,
    left: -40,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.headerOverlay,
  },
  headerColumn: {
    zIndex: 1,
  },
  headerRow1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchHint: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.surface,
    opacity: 0.9,
    marginTop: SPACING.xs,
    marginLeft: 48,
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.headerOverlayLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.surface,
    opacity: 0.8,
    marginTop: SPACING.md,
    zIndex: 1,
  },
  title: {
    fontSize: FONT_SIZE.headerTitle,
    fontWeight: '800',
    color: COLORS.surface,
    marginTop: SPACING.xs,
    zIndex: 1,
  },
  sectionHeader: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '800',
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  listContent: {
    backgroundColor: COLORS.screenBg,
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.tabBarBorder,
    paddingHorizontal: SPACING.lg,
  },
  tabItem: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -45,
  },
});

export default HomeScreen;
