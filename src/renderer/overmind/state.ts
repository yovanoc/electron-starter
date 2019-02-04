import IPeeSee from "common/IPeeSee";
import { ipcRenderer } from "electron";
import { IDerive } from "./";

// tslint:disable-next-line:interface-over-type-literal
export type Post = {
  id: string;
  title: string;
  body: string;
};

// tslint:disable-next-line:interface-over-type-literal
export type State = {
  ipc: IPeeSee;
  ipcValue: number;
  isLoadingPosts: boolean;
  showCount: string;
  posts: Post[];
  filteredPosts: IDerive<State, Post[]>;
};

export const state: State = {
  filteredPosts: s => s.posts.slice(0, Number(s.showCount)),
  ipc: new IPeeSee(ipcRenderer),
  ipcValue: 0,
  isLoadingPosts: true,
  posts: [],
  showCount: "10"
};
