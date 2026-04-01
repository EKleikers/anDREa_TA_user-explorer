import UserItem from "../UserItem/UserItem";
import { User } from "../../../types/User";

type Props = {
    users: User[];
    onDelete: (id: number) => void;
    bookmarks: number[];
    onToggleBookmark: (id: number) => void;
    isAuthenticated: boolean;
};
  
function UserList({ users, onDelete, bookmarks, onToggleBookmark, isAuthenticated  }: Props) {
    return (
        <div className="user-list">
            {users.map((user) => (
                <UserItem
                    key={user.id}
                    user={user}
                    onDelete={onDelete}
                    bookmarks={bookmarks}
                    onToggleBookmark={onToggleBookmark}
                    isAuthenticated={isAuthenticated}
                />
            ))}
        </div>
    );
}

export default UserList;