import React, { useState } from "react";
import { supabase } from "../utils/supabase";

export default function SkillManager({
  currentUser,
  skillsData,
  fetchSkillsData,
}) {

  const [newSkillName, setNewSkillName] = useState("");


  async function handleAddSkill(e) {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const { error } = await supabase.from("skills").insert([
      {
        name: newSkillName,
        status: "Wishlist", 
        user_id: currentUser.id,
      },
    ]);

    if (error) {
      console.log(error);
    } else {
      setNewSkillName(""); 
      fetchSkillsData(); //re-renders
    }
  }

  async function handleDeleteSkill(id) {
    const { error } = await supabase.from("skills").delete().eq("id", id);

    if (error) {
      console.log(error);
    } else {
      fetchSkillsData(); //re-renders
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <div className="manager-container">
      <div className="manager-header">
        <h3>Welcome, {currentUser.email}</h3>
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>

      <form onSubmit={handleAddSkill} className="add-skill-form">
        <h2>Add a New Skill</h2>
        <div className="input-group">
          <input
            type="text"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            required
          />
          <button type="submit">Add to Skill Board</button>
        </div>
      </form>

      <hr />

      <div className="delete-list-section">
        <h2>Your Tracked Skills</h2>
        {skillsData.length === 0 ? (
          <p>No skills tracked. Use "Add a New Skill" above to create a list.</p>
        ) : (
          <ul className="manager-skills-list">
            {skillsData.map((skill) => (
              <li key={skill.id} className="manager-skill-item">
                <span>
                  <strong>{skill.name}</strong> — <em>{skill.status}</em>
                </span>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteSkill(skill.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
