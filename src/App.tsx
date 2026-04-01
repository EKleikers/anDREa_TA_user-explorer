import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import UserDetailPage from "./pages/UserDetailPage";
import { User } from "./types/User";
import Login from "./pages/Login/Login";
import "./App.css";

function App() {

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info" | "danger">("success");
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);

  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    const stored = localStorage.getItem("bookmarks");
    return stored ? JSON.parse(stored) : [];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("auth") === "true";
  });

  const login = () => {
    localStorage.setItem("auth", "true");
    setIsAuthenticated(true);

    setToast("You are now logged in");
    setToastType("success");
  };
  
  const logout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);

    setToast("You have been logged out");
    setToastType("info");
  };

  // Fetch users 
  useEffect(() => {
    setLoading(true);

    fetch("https://dummyjson.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users"); 
        return res.json();
      })
      .then((data) => {
        const sorted = [...data.users].sort((a: User, b: User) =>
          a.lastName.localeCompare(b.lastName)
        );

        setAllUsers(sorted);
        setUsers(sorted);
        setLoading(false); 
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
        setLoading(false); 
      })
  }, []);

  // search 
  useEffect(() => {
    const delay = setTimeout(() => {
      if (!search) {
        setUsers(allUsers);
        return;
      }

      const filtered = allUsers.filter(
        (user) =>
          user.firstName.includes(search) ||
          user.lastName.includes(search)
      );

      const sorted = [...filtered].sort((a, b) =>
        a.lastName.localeCompare(b.lastName)
      );

      setUsers(sorted);
    }, 300);

    return () => clearTimeout(delay);
  }, [search, allUsers]);

  // info 
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  // bookmarks in localstorage
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // delete user
  const handleDelete = async (id: number) => {
    try {

      const user = users.find((u) => u.id === id);
      // DELETE
      const res = await fetch(`https://dummyjson.com/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      // state 
      setUsers((prev) => prev.filter((user) => user.id !== id));
  
      // info
      setToast(
        user
          ? `${user.firstName} ${user.lastName} deleted successfully`
          : "User deleted successfully"
      );
      setToastType("danger");
  
    } catch (error) {
      console.error(error);
      setToast("Something went wrong");
      setToastType("error");
    }
  };

  // Save (create + update)
  const handleSave = async (user: User): Promise<boolean> => {
    /*
      // validation: firstName & lastName 
      if (!user.firstName || !user.lastName) {
        setToast("First and last name are required");
        setToastType("error");
        return false;
      }
      // validation: email validation
      if (!user.email.includes("@")) {
        setToast("Invalid email");
        setToastType("error");
        return false;
      }
    */
    const exists = allUsers.some((u) => u.id === user.id);

    try {
      // CREATE > POST
      if (!exists) {
        const res = await fetch("https://dummyjson.com/users/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (!res.ok) throw new Error("Create failed");
      }
  
      // UPDATE > no PUT due to DummyJSON limitations
      setAllUsers((prev) => {
        const updated = exists
          ? prev.map((u) => (u.id === user.id ? user : u))
          : [...prev, user];
  
        return [...updated].sort((a, b) =>
          a.lastName.localeCompare(b.lastName)
        );
      });

      setUsers((prev) => {
        const updated = exists
          ? prev.map((u) => (u.id === user.id ? user : u))
          : [...prev, user];

        return [...updated].sort((a, b) =>
          a.lastName.localeCompare(b.lastName)
        );
      });
  
      // info
      setToast(
        exists
          ? `${user.firstName} ${user.lastName} updated successfully`
          : `${user.firstName} ${user.lastName} created successfully`
      );
      setToastType("success");
      return true;
  
    } catch (error) {
      console.error(error);
      setToast("Something went wrong");
      setToastType("error");
      return false;
    }
  };

  const filteredUsers = showOnlyBookmarks
  ? users.filter(user => bookmarks.includes(user.id))
  : users;

  const toggleBookmark = (id: number) => {
    const user = users.find((u) => u.id === id);
    const isBookmarked = bookmarks.includes(id);
  
    setBookmarks(prev =>
      isBookmarked
        ? prev.filter(b => b !== id)
        : [...prev, id]
    );
  
    if (user) {
      setToast(
        isBookmarked
          ? `Bookmark removed for ${user.firstName} ${user.lastName}`
          : `Bookmark added for ${user.firstName} ${user.lastName}`
      );
      setToastType("info");
    }
  };

  return (
    <div className="container">
      {toast && <div className={`toast ${toastType}`}>{toast}</div>}

      <Routes>

        <Route 
          path="/login" 
          element={
            <Login onLogin={login} />
          } 
        />

        <Route
          path="/"
          element={
            <Home
              users={filteredUsers}
              loading={loading}
              error={error}
              search={search}
              setSearch={setSearch}
              onDelete={handleDelete}
              showOnlyBookmarks={showOnlyBookmarks}
              setShowOnlyBookmarks={setShowOnlyBookmarks}
              bookmarks={bookmarks}
              onToggleBookmark={toggleBookmark}
              isAuthenticated={isAuthenticated}   
              logout={logout}  
            />
          }
        />

        <Route
          path="/users/:id/:mode"
          element={
            <UserDetailPage
              users={users}
              onSave={handleSave}
            />
          }
        />

        <Route
          path="/users/new"
          element={
            <UserDetailPage
              users={users}
              onSave={handleSave}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;