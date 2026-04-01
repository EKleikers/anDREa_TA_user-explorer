import { useNavigate } from "react-router-dom";
import UserList from "../../components/User/UserList/UserList";
import { User } from "../../types/User";
import Button from "../../components/UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser as solidUser } from "@fortawesome/free-solid-svg-icons";
import { faUser as regularUser } from "@fortawesome/free-regular-svg-icons";
import "./Home.css";

type Props = {
  users: User[];
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (value: string) => void;
  onDelete: (id: number) => void;
  showOnlyBookmarks: boolean;
  setShowOnlyBookmarks: (value: boolean) => void;
  bookmarks: number[];
  onToggleBookmark: (id: number) => void;
  isAuthenticated: boolean; 
  logout: () => void;      
};

function Home({ 
    users, 
    loading, 
    error, 
    search, 
    setSearch, 
    onDelete, 
    showOnlyBookmarks, 
    setShowOnlyBookmarks, 
    bookmarks,
    onToggleBookmark,
    isAuthenticated,
    logout 
}: Props) {

  const navigate = useNavigate();

  if (error) return <p>Error: {error}</p>;
  

  return (
    <>
      <div className="home__header flex-between">
        <h1 className="home__header-title">User Explorer</h1>

        <button
          className="home__icon-button"
          onClick={() => {
            if (isAuthenticated) {
              logout();
            } else {
              navigate("/login");
            }
          }}
          title={
            isAuthenticated
              ? "You are logged in, click to log out"
              : "You are logged out, click to log in"
          }
          aria-label={isAuthenticated ? "Logout" : "Login"}
        >
          <FontAwesomeIcon icon={isAuthenticated ? solidUser : regularUser} />
        </button>
      </div>
      <hr className="hr"/>

      <div className="toolbar flex gap-md">
      <input
          className="input"
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button 
          variant={showOnlyBookmarks ? "primary" : "secondary"}
          onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)}>
          {showOnlyBookmarks ? "Show All" : "Bookmarks"}
        </Button>

        <Button 
          variant="success"
          onClick={() => navigate("/users/new")}>
          + Add User
        </Button>
      </div>

      {loading ? (
        <p className="text-center mt-md">Searching...</p>
      ) : users.length === 0 ? (
        <p className="home__empty-state">
        {showOnlyBookmarks
          ? "No bookmarks yet ⭐"
          : "No users found"}
        </p>
      ) : (
        <UserList
          users={users}
          onDelete={onDelete}
          bookmarks={bookmarks}
          onToggleBookmark={onToggleBookmark}
          isAuthenticated={isAuthenticated}
        />
      )}
      
    </>
    
  );
}

export default Home;