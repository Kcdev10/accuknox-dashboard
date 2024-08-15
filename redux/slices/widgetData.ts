import { createSlice } from "@reduxjs/toolkit";
import JsonData from "@/data/data.json";

// Define a type for the slice state
interface WidgetDataState {
  categories: CartegoriesState[];
}

interface CartegoriesState {
  id: string;
  name: string;
  widgets: {
    id: string;
    name: string;
    text: string;
    isShow: boolean;
  }[];
}

// Define the initial state using that type
const initialState: WidgetDataState = {
  categories:
    (typeof window !== "undefined" &&
      JSON.parse(localStorage?.getItem("widget_data") as string)) ||
    JsonData.categories,
};

export const widgetData = createSlice({
  name: "widgetData",
  initialState,
  reducers: {
    addWidget: (state, actions) => {
      const isDataExist = state.categories.find(
        (item) => item.name == actions.payload.category
      );

      if (isDataExist) {
        const addedData = {
          id: Date.now().toString(),
          name: actions.payload.title,
          text: actions.payload.description,
          isShow: true,
        };
        isDataExist.widgets.push(addedData);
      }

      localStorage.setItem("widget_data", JSON.stringify(state.categories));
    },

    removeWidget: (state, actions) => {
      const isDataExist = state.categories.find(
        (item) => item.name == actions.payload.category
      );
      console.log(isDataExist);

      if (isDataExist) {
        const getWidgetIndex = isDataExist.widgets.findIndex(
          (item) => item.id == actions.payload.item.id
        );

        if (getWidgetIndex == 0 ? true : getWidgetIndex) {
          isDataExist.widgets.splice(getWidgetIndex, 1);
        }
      }

      localStorage.setItem("widget_data", JSON.stringify(state.categories));
    },

    showWidget: (state, actions) => {
      const isDataExist = state.categories.find(
        (item) => item.name == actions.payload.category
      );

      if (isDataExist) {
        const getWidget = isDataExist.widgets.find(
          (item) => item.id == actions.payload.item.id
        );
        if (getWidget) {
          getWidget.isShow = !getWidget.isShow;
        }
      }

      localStorage.setItem("widget_data", JSON.stringify(state.categories));
    },
  },
});

export const { addWidget, showWidget, removeWidget } = widgetData.actions;
