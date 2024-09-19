import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useApolloClient } from "@apollo/client";
import LoginForm from "./components/Login";
import Recommendations from "./components/Recommendations";

const App = () => {
  const client = useApolloClient()
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("phonenumbers-user-token"))

  const [page, setPage] = useState("authors");

  const logout = () => {
    localStorage.removeItem("phonenumbers-user-token")
    client.resetStore()
    setLoggedIn(false)
  }

  const setToken = (token) => {
    localStorage.setItem("phonenumbers-user-token", token)
    setPage("authors")
    setLoggedIn(true)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>Authors</button>
        <button onClick={() => setPage("books")}>Books</button>
        {loggedIn && <button onClick={() => setPage("add")}>Add book</button>}
        {loggedIn ?
          <>
            <button onClick={() => setPage("recommendations")}>Recommendations</button>
            <button onClick={logout}>Logout</button>
          </>
          :
          <button onClick={() => setPage("login")}>Login</button>
        }
      </div>
      <br />
      <br />

      <Authors show={page === "authors"} loggedIn={loggedIn} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommendations show={page === "recommendations"} />

      {page === "login" && <LoginForm setToken={setToken} />}
    </div>
  );
};

export default App;
