import React from "react";
import { supabase } from "../utils/supabase";

export default function SkillCard({ skill, fetchSkillsData, currentUser }) {
  async function updateSkillStatus(newStatus) {
    const { error } = await supabase
      .from("skills")
      .update({ status: newStatus })
      .eq("id", skill.id);

    if (error) {
      alert(error.message);
    } else {
      fetchSkillsData(); // rerender
    }
  }

  return (
    <div className="skill-card">
      <h3>{skill.name}</h3>

      {/* **** only logged-in users can update status!! **** */}
      {currentUser && (
        <div className="card-actions">
          {skill.status === "Wishlist" && (
            <button onClick={() => updateSkillStatus("In Progress")}>
              Start Learning &rarr;
            </button>
          )}

          {skill.status === "In Progress" && (
            <>
              <button
                className="secondary-btn"
                onClick={() => updateSkillStatus("Wishlist")}
              >
                &larr; Move Back
              </button>
              <button onClick={() => updateSkillStatus("Mastered")}>
                Mastered! &rarr;
              </button>
            </>
          )}

          {skill.status === "Mastered" && (
            <button
              className="secondary-btn"
              onClick={() => updateSkillStatus("In Progress")}
            >
              &larr; Revisit Skill
            </button>
          )}
        </div>
      )}
    </div>
  );
}
