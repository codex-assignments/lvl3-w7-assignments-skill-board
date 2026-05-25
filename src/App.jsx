import { useEffect, useState } from "react";

import "./App.css";
import { Route, Router, Routes } from "react-router";
import ManagePage from "./pages/ManagePage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import { supabase } from "./utils/supabase";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [skillsData, setSkillsData] = useState([]);

  async function fetchSkillsData() {
    const { data, error } = await supabase.from("skills").select("*");
    if (!error && data) {
      setSkillsData(data);
    }
  }

  useEffect(() => {
    fetchSkillsData();

    //check to see if user is signed in and set current user
    async function checkUser() {
      const response = await supabase.auth.getSession();
      if (response.data.session) {
        setCurrentUser(response.data.session.user);
      } else {
        setCurrentUser(null);
      }
    }
    checkUser();

    // check to see if user signs in or out on Auth state change
    const listener = supabase.auth.onAuthStateChange((e, session) => {
      if (session) {
        setCurrentUser(session.user);
      } else {
        setCurrentUser(null);
      }
    });

    //turns off connection so there isn't a new listener every time the component renders, supabase function that tells the server stop listening
    // clean up, best practice
    return () => {
      listener.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <NavBar currentUser={currentUser} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              skillsData={skillsData}
              currentUser={currentUser}
              fetchSkillsData={fetchSkillsData}
            />
          }
        />
        <Route
          path="/manage"
          element={
            <ManagePage
              skillsData={skillsData}
              currentUser={currentUser}
              fetchSkillsData={fetchSkillsData}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
