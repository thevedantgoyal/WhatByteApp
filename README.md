# WhatByte App

A React Native task management app for gig workers. Create, edit, and organize tasks with due dates and priorities. Syncs with Firebase Firestore.

## Screenshot
<img width="400" height="871" alt="Image" src="https://github.com/user-attachments/assets/b209fc58-14ea-438e-8cb6-f490b32bec4d" />
<img width="399" height="862" alt="Image" src="https://github.com/user-attachments/assets/f67a1a87-c0aa-4414-8c61-9f8e7e74614c" />
<img width="400" height="839" alt="Image" src="https://github.com/user-attachments/assets/e4c33b1a-d5a4-447e-bf66-8456ba420c9d" />
<img width="398" height="884" alt="Image" src="https://github.com/user-attachments/assets/ad8a821d-cb87-4bb5-bf57-90b2093a7ff7" />
<img width="400" height="846" alt="Image" src="https://github.com/user-attachments/assets/27ba2fc6-9ded-4e5b-afa1-dd2e480e9f99" />

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
