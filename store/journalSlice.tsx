import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ThunkStatus } from "./store";
import Config from "@/constants/Config";

export type JournalEntry = {
  id: number;
  title: string;
  content: string;
  date: Date;
  categories?: Array<string>;
};

export type JournalEntryPayload = {
  id?: number;
  title: string;
  content: string;
  date: Date;
  category_names?: Array<string>;
  token?: string;
};

export type JournalEntryResponse = {
  title?: string;
  content?: string;
  date?: string;
  category_names?: Array<string>;
  message?: string;
};

export const saveJournal = createAsyncThunk(
  "journals/saveJournal",
  async (
    { id, title, content, date, category_names, token }: JournalEntryPayload,
    thunkApi
  ) => {
    return await fetch(`${Config.API_URL}/api/v1/journal-entries/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token} `,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title, content, date, category_names }),
    }).then(async (response) => {
      let result: JournalEntryResponse | null = null;
      if (response.headers.get("content-type") === "application/json") {
        result = (await response.json()) as JournalEntryResponse;
      }

      if (!response.ok) {
        result ??= { message: "Operation Failed" };
        return thunkApi.rejectWithValue(result);
      }

      return result;
    });
  }
);

interface JournalSliceState {
  journals: Array<JournalEntry>;
  journalsStatus: ThunkStatus;
  saveJournalStatus: ThunkStatus;
}

const initialState: JournalSliceState = {
  journals: [],
  journalsStatus: "idle",
  saveJournalStatus: "idle",
};

export const journalSlice = createSlice({
  name: "journals",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(saveJournal.pending, (state) => {
      state.saveJournalStatus = "pending";
    });
    builder.addCase(saveJournal.rejected, (state) => {
      state.saveJournalStatus = "rejected";
    });
    builder.addCase(saveJournal.fulfilled, (state) => {
      state.saveJournalStatus = "fulfilled";
    });
  },
});
