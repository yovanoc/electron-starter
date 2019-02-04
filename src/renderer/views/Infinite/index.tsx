import React, { Fragment, FunctionComponent, useEffect, useState } from "react";

const InfiniteUsers: FunctionComponent = props => {
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://randomuser.me/api/?results=10");
      const data = await res.json();
      const nextUsers = data.results.map((user: any) => ({
        email: user.email,
        name: Object.values(user.name).join(" "),
        photo: user.picture.medium,
        username: user.login.username,
        uuid: user.login.uuid
      }));

      setHasMore(users.length < 100);
      setLoading(false);
      setUsers([...users, ...nextUsers]);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();

    window.onscroll = ev => {
      if (error || isLoading || !hasMore) {
        return;
      }
      // tslint:disable-next-line:no-console
      console.log(
        window.innerHeight,
        document.documentElement.scrollTop,
        document.documentElement.offsetHeight
      );
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        // tslint:disable-next-line:no-console
        console.log("load users");
        loadUsers();
      }
    };
  }, []);

  return (
    <div>
      <h1>Infinite Users!</h1>
      <p>Scroll down to load more!!</p>
      {users.map(user => (
        <Fragment key={user.username}>
          <hr />
          <div style={{ display: "flex" }}>
            <img
              alt={user.username}
              src={user.photo}
              style={{
                borderRadius: "50%",
                height: 72,
                marginRight: 20,
                width: 72
              }}
            />
            <div>
              <h2 style={{ marginTop: 0 }}>@{user.username}</h2>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          </div>
        </Fragment>
      ))}
      <hr />
      {error && <div style={{ color: "#900" }}>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {!hasMore && <div>You did it! You reached the end!</div>}
    </div>
  );
};

export default InfiniteUsers;
