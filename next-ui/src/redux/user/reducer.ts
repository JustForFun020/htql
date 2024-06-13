import { IUser } from '@/utils/interface/user';
import { createSlice } from '@reduxjs/toolkit';

interface InitState {
  user: IUser;
}

const initialState: InitState = {
  user: {} as IUser,
};

const reducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = reducer.actions;
const userReducer = reducer.reducer;
export default userReducer;
