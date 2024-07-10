import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ThunkStatus } from "./store";
import Config from "@/constants/Config";

export type JournalEntry = {
  id: number;
  title: string;
  content: string;
  date: string;
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
      method: id ? "PUT" : "POST",
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
      }

      if (!response.ok) {
        result ??= { message: "Operation Failed" };
        return thunkApi.rejectWithValue(result);
      }

      return result;
    });
  }
);

export const fetchJournals = createAsyncThunk(
  "journals/fetchJournals",
  async ({ token }: { token: string }) => {
    return await fetch(`${Config.API_URL}/journal-entries/`, {
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
      },
    }).then(async (response) => {
      return (await response.json()) as Array<JournalEntry>;
    });
  }
);

export type Category = {
  id: number;
  name: string;
};

export const fetchCategories = createAsyncThunk(
  "journals/fetchCategories",
  async ({ token }: { token: string }) => {
    return await fetch(`${Config.API_URL}/categories/`, {
      headers: {
        Authorization: `Token ${token}`,
        Accept: "application/json",
      },
    }).then(async (response) => {
      return (await response.json()) as Array<Category>;
    });
  }
);

interface JournalSliceState {
  journals: Array<JournalEntry>;
  journalsStatus: ThunkStatus;

  saveJournalStatus: ThunkStatus;

  categories: Array<Category>;
  categoriesStatus: ThunkStatus;
}

const initialState: JournalSliceState = {
  journals: [],
  journalsStatus: "idle",

  saveJournalStatus: "idle",

  categories: [],
  categoriesStatus: "idle",
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

    builder.addCase(fetchJournals.pending, (state) => {
      state.journalsStatus = "pending";
    });
    builder.addCase(fetchJournals.rejected, (state) => {
      state.journalsStatus = "rejected";
    });
    builder.addCase(fetchJournals.fulfilled, (state, { payload }) => {
      state.journalsStatus = "fulfilled";
      state.journals = payload;
    });

    builder.addCase(fetchCategories.pending, (state) => {
      state.categoriesStatus = "pending";
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.categoriesStatus = "rejected";
    });
    builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
      state.categoriesStatus = "fulfilled";
      state.categories = payload;
    });
  },
});
