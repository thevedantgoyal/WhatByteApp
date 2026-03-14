import { db } from './firebase';

const COLLECTION = 'tasks';

function noDbUnsubscribe() {
  return function unsubscribe() {};
}

export function subscribeTasks(userId, onUpdate, onError) {
  if (!db) {
    onError(new Error('Firestore not available'));
    return noDbUnsubscribe();
  }

  try {
    const unsubscribe = db
      .collection(COLLECTION)
      .where('userId', '==', userId)
      .orderBy('dueDate', 'asc')
      .onSnapshot(
        (querySnapshot) => {
          const tasks = [];
          querySnapshot.forEach((doc) => {
            tasks.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          onUpdate(tasks);
        },
        (err) => {
          onError(err);
        }
      );

    return unsubscribe;
  } catch (err) {
    onError(err);
    return noDbUnsubscribe();
  }
}

export async function createTask(taskData) {
  if (!db) {
    return { success: false, error: 'Firestore not available' };
  }

  try {
    const data = {
      ...taskData,
      createdAt: new Date().toISOString(),
    };
    await db.collection(COLLECTION).add(data);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message || 'Failed to create task' };
  }
}

export async function updateTask(taskId, updates) {
  if (!db) {
    return { success: false, error: 'Firestore not available' };
  }

  try {
    await db.collection(COLLECTION).doc(taskId).update(updates);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message || 'Failed to update task' };
  }
}

export async function deleteTask(taskId) {
  if (!db) {
    return { success: false, error: 'Firestore not available' };
  }

  try {
    await db.collection(COLLECTION).doc(taskId).delete();
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message || 'Failed to delete task' };
  }
}

export async function toggleComplete(taskId, currentValue) {
  return updateTask(taskId, { isCompleted: !currentValue });
}
