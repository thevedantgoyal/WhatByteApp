# WhatByte App

A React Native task management app for gig workers. Create, edit, and organize tasks with due dates and priorities. Syncs with Firebase Firestore.

## Tech Stack

- **React Native CLI** (JavaScript)
- **Firebase** — Auth (email/password), Firestore
- **React Navigation v6** — Stack navigator


## Setup

### 1. Clone & Install

```bash
git clone <repo-url>
cd WhatByteApp
npm install
```

### 2. Firebase Configuration

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication** → Email/Password sign-in
3. Create a **Firestore** database (start in test mode for development)
4. Add apps to your project:
   - **Android**: Download `google-services.json` → place at `android/app/google-services.json`
   - **iOS**: Download `GoogleService-Info.plist` → add to Xcode project (right-click project → Add files)

### 3. Firestore Rules

Set rules in Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, write: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

### 4. Run

```bash
# Android
npm run android

# iOS
npm run ios
```

## Folder Structure

```
src/
├── components/     # Reusable UI (TaskCard, FormInput, FAB, etc.)
├── constants/      # Theme (colors, spacing, fonts)
├── hooks/          # useAuth, useTasks
├── navigation/     # Auth stack, App stack
├── screens/        # Splash, Login, Register, Home, TaskForm
├── services/       # firebase, authService, taskService
├── store/          # Zustand task store
└── utils/          # dateHelpers
```

## Features

- **Auth** — Email/password sign up & login
- **Task list** — Grouped by Today, Tomorrow, This week
- **Create/Edit tasks** — Title, description, due date, priority
- **Mark complete** — Toggle completion status
- **Swipe to delete** — Swipe left on a task to reveal delete
- **Search** — Filter tasks by title
- **Empty & error states** — Retry on load failure
- **Offline-capable** — Firestore syncs when online
