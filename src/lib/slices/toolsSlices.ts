// slices/toolsSlice.ts
import { getTools } from '@/store/common/extras';
import { TTools } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

type ToolsState = {
  tools: TTools[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

const initialState: ToolsState = {
  tools: [],
  status: 'idle',
};

const toolsSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTools.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTools.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tools = action.payload;
      })
      .addCase(getTools.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default toolsSlice.reducer;
