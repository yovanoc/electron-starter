import React, { FunctionComponent, useEffect } from "react";
import { useOvermind } from "renderer/overmind";

const Overmind: FunctionComponent = props => {
  const { actions, state } = useOvermind();

  useEffect(() => {
    actions.getPosts();
    actions.getData();
  }, []);

  return (
    <div>
      {state.ipcValue}
      {state.isLoadingPosts ? (
        <h4>Loading...</h4>
      ) : (
        <div>
          Show count:{" "}
          <select value={state.showCount} onChange={actions.changeShowCount}>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <ul>
            {state.filteredPosts.map((post, index) => (
              <li key={post.id}>
                <h4>
                  {index + 1}. {post.title}
                </h4>
                {post.body}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Overmind;
