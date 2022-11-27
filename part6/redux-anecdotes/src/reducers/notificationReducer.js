import { createSlice } from "@reduxjs/toolkit";

const initialState = '';

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notificationChange(state, action) {
            return action.payload;
        },
        hideNotification(state, action) {
            return '';
        }
    }
});

export const { notificationChange, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;