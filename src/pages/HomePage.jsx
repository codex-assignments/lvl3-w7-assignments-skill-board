import React from "react";
import SkillCard from "../components/SkillCard";

export default function HomePage({ skillsData, fetchSkillsData, currentUser }) {
  const columns = [
    { title: "Wishlist", value: "Wishlist" },
    { title: "In Progress", value: "In Progress" },
    { title: "Mastered", value: "Mastered" },
  ];

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Tech Skill Board</h1>
        <p>Tracking software developer skills.{}</p>
      </header>

      <div className="board-grid">
        {/* map column per title */}
        {columns.map((col) => {
          // filtered skills by column value
          const filteredSkills = skillsData.filter(
            (skill) => skill.status === col.value,
          );

          return (
            <div key={col.value} className="board-column">
              <div className="column-header">
                <h2>{col.title}</h2>
              </div>

              <div className="column-body">
                {/* if no skills, display an empty message */}
                {filteredSkills.length === 0 ? (
                  <p className="empty-message">No skills here yet.</p>
                ) : (
                  // map filtered skills to skillcards
                  filteredSkills.map((skill) => (
                    <SkillCard
                      key={skill.id}
                      skill={skill}
                      fetchSkillsData={fetchSkillsData}
                      currentUser={currentUser}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
