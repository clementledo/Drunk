# Copilot Instructions - Drunk Mobile App

## Architecture Overview

This is a React Native 0.73.2 app using Redux Toolkit for state management, React Navigation for routing, and a clean architecture pattern. The app features conditional navigation based on authentication state.

## Key Patterns & Conventions

### Redux State Management
- **3-slice architecture**: `authSlice`, `userSlice`, `appSlice` in `src/store/slices/`
- **Persistence**: Only `auth` and `user` slices persist via Redux Persist + AsyncStorage
- **Actions pattern**: Always dispatch `*Start` → `*Success`/`*Failure` for async operations
- **Selector pattern**: Use `useSelector(state => state.sliceName.property)` consistently

### Navigation Flow
- **Conditional rendering**: `AppNavigator.js` shows Auth stack OR Main tabs based on `state.auth.isAuthenticated`
- **No headers**: All screens use `headerShown: false` and custom SafeAreaView layouts
- **Tab navigation**: Home/Profile/Settings with Material Icons, color `#007AFF` for active state

### API Architecture
- **Single client**: `apiClient.js` with automatic token injection via request interceptor
- **Auto-refresh**: Response interceptor handles 401 errors by refreshing tokens automatically
- **Service pattern**: Separate services (`authService`, `userService`) wrapping apiClient calls
- **Error handling**: Services throw error.response?.data || error.message for consistent error objects

### Component Patterns
- **Common components**: `Button`, `Input`, `LoadingScreen` in `src/components/common/`
- **Button variants**: `primary|secondary|danger|success` with `small|medium|large` sizes
- **Input validation**: Built-in error display, left/right icons, secureTextEntry toggle
- **Style composition**: Use array syntax `[styles.base, styles.variant, customStyle]`

### Form Handling
- **Validation pattern**: Create `errors` state, clear errors on input change, validate before submit
- **Redux integration**: Dispatch `*Start` before API call, handle loading states from Redux
- **Custom hooks**: Use `useAuth()` for auth operations, `useFormValidation()` for form state

### Storage & Persistence
- **Storage keys**: Defined in `STORAGE_KEYS` constants (`src/utils/storage.js`)
- **StorageService**: Centralized AsyncStorage wrapper with JSON serialization
- **Auth tokens**: Stored as `authToken`/`refreshToken` keys, handled by apiClient interceptors

### Styling & Theme
- **Centralized theme**: `src/constants/theme.js` exports `COLORS`, `FONT_SIZES`, `SPACING`, etc.
- **iOS-style colors**: Primary `#007AFF`, backgrounds `#F2F2F7`/`#FFFFFF`, text `#1C1C1E`/`#8E8E93`
- **Consistent spacing**: Use `SPACING.md` (12px), `SPACING.lg` (16px) instead of magic numbers
- **Shadow patterns**: Import `SHADOWS.medium` for consistent card shadows

## Development Workflows

### Running the App
```bash
npm start           # Start Metro bundler
npm run android     # Android development
npm run ios         # iOS development (macOS only)
```

### Testing
```bash
npm test           # Run Jest tests
npm test -- --watch   # Watch mode
```
- **Test setup**: `src/utils/testSetup.js` mocks AsyncStorage, Vector Icons, API client
- **Component tests**: Use `@testing-library/react-native`, test user interactions not implementation
- **Coverage**: 70% minimum threshold for branches/functions/lines/statements

### Key Files to Understand
- `App.js`: Root component with Provider → PersistGate → NavigationContainer hierarchy
- `src/store/store.js`: Redux configuration with persistence whitelist
- `src/navigation/AppNavigator.js`: Conditional navigation logic
- `src/services/api/apiClient.js`: HTTP client with auth interceptors
- `src/constants/theme.js`: Design system constants

## Common Tasks

### Adding New Screens
1. Create screen in appropriate folder (`src/screens/` or `src/screens/auth/`)
2. Import and add to navigation in `AppNavigator.js`
3. Use `useEffect(() => dispatch(setCurrentScreen('ScreenName')), [])` for tracking

### Adding Redux State
1. Create slice in `src/store/slices/` following existing patterns
2. Add to `rootReducer` in `store.js`
3. Add to persistence `whitelist` if data should persist

### API Integration
1. Add service methods to appropriate file in `src/services/api/`
2. Use existing error handling pattern: `throw error.response?.data || error.message`
3. Token injection is automatic via apiClient interceptors

### Form Components
1. Use `Input` component with validation props
2. Follow error clearing pattern: clear error on input change
3. Use `Button` with loading state from Redux
4. Wrap in `KeyboardAvoidingView` and `ScrollView` for keyboard handling

This codebase prioritizes consistency, clean separation of concerns, and robust error handling. Follow existing patterns rather than creating new ones.
