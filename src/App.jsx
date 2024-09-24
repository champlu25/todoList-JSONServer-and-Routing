import { Routes, Route, Navigate } from "react-router-dom";
import { MainPage, TodoPage, NotFound } from "./pages";
import { useState } from "react";

function App() {
  const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);

  const toggleRefreshTodosFlag = () => {
    setRefreshTodosFlag(!refreshTodosFlag);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainPage
            refreshTodosFlag={refreshTodosFlag}
            toggleRefreshTodosFlag={toggleRefreshTodosFlag}
          />
        }
      />
      <Route
        path="/task/:id"
        element={
          <TodoPage
            refreshTodosFlag={refreshTodosFlag}
            toggleRefreshTodosFlag={toggleRefreshTodosFlag}
          />
        }
      />
      <Route />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
