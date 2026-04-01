import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../types/User";
import UserCard from "../components/User/UserCard/UserCard";
import UserForm from "../components/User/UserForm/UserForm";

type Props = {
  users: User[];
  onSave?: (user: User) => void;
};

function UserDetailPage({ users, onSave }: Props) {
  const { id, mode } = useParams();

  //const isEdit = mode === "edit";
  const isDetail = mode === "detail";
  const isCreate = location.pathname === "/users/new";

  const [data, setData] = useState<User | null>(null);

  // Zoek eerst in state
  const existingUser = users.find((u) => u.id === Number(id));

  useEffect(() => {
    if (isCreate) return;

    if (existingUser) {
      setData(existingUser);
    } else {
      fetch(`https://dummyjson.com/users/${id}`)
        .then((res) => res.json())
        .then((data) => setData(data));
    }
  }, [id, isCreate, existingUser]);

  // DETAIL
  if (isDetail && data) {
    return <UserCard user={data} />;
  }

  // EDIT / CREATE
  return <UserForm onSave={onSave} isCreate={isCreate} users={users}/>;
}

export default UserDetailPage;