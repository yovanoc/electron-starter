import {
  IAction,
  IConfig,
  IDerive,
  IOnInitialize,
  IOperator,
  Overmind,
  TStateObject
} from "overmind";
import { createHook } from "overmind-react";
import * as actions from "./actions";
import * as effects from "./effects";
import { state } from "./state";

const config = {
  actions,
  effects,
  state
};

type Config = IConfig<typeof config>;

export interface IOnInitialize extends IOnInitialize<Config> {}

export interface IAction<Input = void> extends IAction<Config, Input> {}

export interface IOperator<Input = void, Output = Input>
  extends IOperator<Config, Input, Output> {}

export interface IDerive<Parent extends TStateObject, Output>
  extends IDerive<Config, Parent, Output> {}

const overmind = new Overmind(config);

export const useOvermind = createHook(overmind);
