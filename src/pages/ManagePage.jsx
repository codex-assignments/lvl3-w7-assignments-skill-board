import React from "react";
import AuthForm from "../components/AuthForm";
import SkillManager from "../components/SkillManager";


export default function ManagePage({
  currentUser,
  skillsData,
  fetchSkillsData,
}) {
  return (
    <div className="page-container">
      {/* if currentUser is not null, show Skill Manager, otherwise show Auth Form */}
      {currentUser ? (
        <SkillManager
          currentUser={currentUser}
          skillsData={skillsData}
          fetchSkillsData={fetchSkillsData}
        />
      ) : (
        <AuthForm />
      )}
    </div>
  );
}
