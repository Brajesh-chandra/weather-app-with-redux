import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeatherAction = createAsyncThunk(
  "fetch/weather",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=af645f1b3bd9f3236f3a48880bccad58&units=imperial`
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slices

const weatherSlices = createSlice({
  name: "weather",
  initialState: { name: "data" },
  extraReducers: builder => {
    builder.addCase(fetchWeatherAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchWeatherAction.fulfilled, (state, action) => {
      state.weather = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchWeatherAction.rejected, (state, action) => {
      state.error = action?.payload;
      state.loading = false;
      state.weather = undefined;
    });
  },
});

export default weatherSlices.reducer;
