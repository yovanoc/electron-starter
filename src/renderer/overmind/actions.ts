import { IPCEvents } from "common/IPCEvents";
import * as React from "react";
import { IAction } from "./";

export const getPosts: IAction = async ({ state, effects }) => {
  state.isLoadingPosts = true;
  state.posts = await effects.request(
    "https://jsonplaceholder.typicode.com/posts"
  );
  state.isLoadingPosts = false;
};

export const changeShowCount: IAction<React.ChangeEvent<HTMLSelectElement>> = ({
  value: event,
  state
}) => {
  state.showCount = event.currentTarget.value;
};

export const getData: IAction = async ({ state }) => {
  const resp = await state.ipc.send<number, any>(IPCEvents.FOO, {
    foo: "bar"
  });
  state.ipcValue = resp.response!;
};
