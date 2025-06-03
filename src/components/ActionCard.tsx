import React from "react";

interface ActionCardProps {
  iconClass: string;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  iconClass,
  title,
  description,
  buttonText,
  onClick,
}) => (
  <div className="card text-center h-100">
    <div className="card-body">
      <h5 className="card-title">
        <i className={`${iconClass} me-2 fs-1`}></i> {title}
      </h5>
      <p className="card-text">{description}</p>
      <button className="btn btn-primary" onClick={onClick}>
        {buttonText}
      </button>
    </div>
  </div>
);