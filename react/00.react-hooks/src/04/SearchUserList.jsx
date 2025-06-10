import React, { useState, useMemo, useEffect } from "react";

export default function SearchUserList() {
  const [users, setUsers] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  console.log("SearchUserList", "渲染");
  useEffect(() => {
    console.log("useEffect执行");
    const doFetch = async () => {
      // 组件首次加载时发请求获取用户数据
      const res = await fetch("https://reqres.in/api/users/", {
        headers: { "x-api-key": "reqres-free-v1" },
      });
      const data = await res.json();
      console.log("---", data);
      setUsers(data);
    };
    doFetch();
  },[]);

  // 类似vue中的computed
  // const usersToShow = useMemo(() => {
  //   if (!users) return null;
  //   return users.data.filter((user) => user.first_name.includes(searchKey));
  // }, [users, searchKey]);

  const usersToShow = () => {
    console.log('usersToShow');
    if (!users) return null;
    return users.data.filter((user) => user.first_name.includes(searchKey));
  };

  return (
    <div>
      <h1>SearchUserList</h1>
      <input
        type="text"
        value={searchKey}
        onChange={(evt) => setSearchKey(evt.target.value)}
      />
      <ul>
        {usersToShow &&
          usersToShow.length > 0 &&
          usersToShow.map((user) => {
            return <li key={user.id}>{user.first_name}</li>;
          })}
      </ul>
    </div>
  );
}
