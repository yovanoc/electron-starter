import { Action } from "redux";

export interface IIncrementAction extends Action {
  type: "INCREMENT";
}

export interface IDecrementAction {
  type: "DECREMENT";
}

export interface ISetAction {
  type: "SET";
  num: number;
}

export type StoreActions = IIncrementAction | IDecrementAction | ISetAction;
