import React, { useRef } from 'react';
import {
  View,
  Animated,
  PanResponder,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING } from '../constants/theme';
import TaskCard from './TaskCard';

const SWIPE_THRESHOLD = 80;
const DELETE_WIDTH = 80;
const CARD_RADIUS = 12;

function SwipeableTaskCard({ task, onToggle, onEdit, onDelete }) {
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, { dx }) => Math.abs(dx) > 5,
      onPanResponderMove: (_, { dx }) => {
        if (dx < 0) {
          translateX.setValue(dx);
        }
      },
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -SWIPE_THRESHOLD) {
          Animated.spring(translateX, {
            toValue: -DELETE_WIDTH,
            useNativeDriver: true,
            tension: 80,
            friction: 10,
          }).start();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.deleteArea}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(task.id)}
        >
          <MaterialIcons name="delete" size={24} color={COLORS.surface} />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[styles.cardWrapper, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        <TaskCard
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          embedded
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: SPACING.sm,
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
  },
  deleteArea: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: DELETE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.error,
    borderTopRightRadius: CARD_RADIUS,
    borderBottomRightRadius: CARD_RADIUS,
    overflow: 'hidden',
  },
  deleteButton: {
    padding: SPACING.md,
  },
  cardWrapper: {
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
  },
});

export default SwipeableTaskCard;
