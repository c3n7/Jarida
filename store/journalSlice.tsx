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
  date: string;
  category_names?: Array<string>;
  token: string;
};

export type JournalEntryResponse = {
  title?: string;
  content?: string;
  date?: string;
  message?: string;
};

export const saveJournal = createAsyncThunk(
  "journals/saveJournal",
  async (
    { id, title, content, date, category_names, token }: JournalEntryPayload,
    thunkApi
  ) => {
    let url = `${Config.API_URL}/journal-entries/`;
    if (id) {
      url += `${id}/`;
    }
    return await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, date, category_names }),
    }).then(async (response) => {
      let result: JournalEntryResponse | null = null;
      if (response.headers.get("content-type") === "application/json") {
        result = (await response.json()) as JournalEntryResponse;
        console.log(result);
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
