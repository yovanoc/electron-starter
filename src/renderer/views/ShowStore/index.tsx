import React, { FunctionComponent, useCallback } from "react";
import { useDispatch, useMappedState } from "redux-react-hook";
import ZaapButton from "renderer/components/zaap/ZaapButton";
import { IStore } from "renderer/store";
import { StoreActions } from "renderer/store/actions";

const ShowStore: FunctionComponent = props => {
  const random = 21;
  const mapState = useCallback((state: IStore) => state.num, [random]);
  const num = useMappedState(mapState);
  const dispatch = useDispatch<StoreActions>();
  const set = useCallback(() => dispatch({ type: "SET", num: random }), [
    random
  ]);

  return (
    <div style={{ flexGrow: 1 }}>
      <ZaapButton onClick={set}>{num} - SET</ZaapButton>
    </div>
  );
};

export default ShowStore;
