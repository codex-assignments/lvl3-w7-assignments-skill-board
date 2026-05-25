import React, { useState } from "react";
import { supabase } from "../utils/supabase";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    //sign up
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        alert(error.message);
      } else {
        alert("Check your email for a confirmation link, or try signing in");
      }
    } else {
      //sign in
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        alert(error.message);
      }
    }
  }

  return (
    <div className="auth-container">
      <h2>
        {isSignUp ? "Sign Up to Manage Skills" : "Sign In to Manage Skills"}
      </h2>

      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
      </form>

      {/* toggle back and forth to sign up and sign in mode, default sign in */}
      <p>
        {isSignUp ? "Already have a user profile?" : "Need to sign up first?"}{" "}
        <button
          className="sign-up-toggle-btn"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}
