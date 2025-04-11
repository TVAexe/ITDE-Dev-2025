import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  studentId: string | null;
  name: string | null;
  email: string | null;
  avatar: string | null;
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: UserState = {
  studentId: null,
  name: null,
  email: null,
  avatar: null,
  isAuthenticated: false,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    clearUser: (state) => {
      return initialState;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser, clearUser, updateUserProfile } = userSlice.actions;
export default userSlice.reducer; 