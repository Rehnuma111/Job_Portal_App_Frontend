import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user:null,
    savedJobs: [],
      isAuthenticated: false,

  },
  reducers: {
    // actions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthUser:(state , action)=>{
      state.user = action.payload
    },
    setSavedJobs: (state, action) => {
      state.savedJobs = action.payload;
    },
    addSavedJob: (state, action) => {
      state.savedJobs.push(action.payload);
    },
    removeSavedJob: (state, action) => {
      state.savedJobs = state.savedJobs.filter(job => job._id !== action.payload);
    },
    logout: (state) => {
    state.user = null;
    state.isAuthenticated = false;
  },
  },
});

export const { setLoading, setAuthUser, setSavedJobs,logout ,  addSavedJob, removeSavedJob } = authSlice.actions;
export default authSlice.reducer;
