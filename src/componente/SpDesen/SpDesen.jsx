import React from "react";

const SpDesen = ({ greseli }) => {
  return (
    <svg height="250" width="200" className="svg-spanzuratoare">
      <line x1="20" y1="230" x2="100" y2="230" stroke="black" strokeWidth="4" />
      {greseli >= 1 && (
        <line x1="60" y1="230" x2="60" y2="30" stroke="black" strokeWidth="4" />
      )}
      {greseli >= 2 && (
        <line x1="60" y1="30" x2="150" y2="30" stroke="black" strokeWidth="4" />
      )}
      {greseli >= 3 && (
        <line
          x1="150"
          y1="30"
          x2="150"
          y2="60"
          stroke="black"
          strokeWidth="2"
        />
      )}
      {greseli >= 4 && (
        <circle
          cx="150"
          cy="80"
          r="20"
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
      )}
      {greseli >= 5 && (
        <line
          x1="150"
          y1="100"
          x2="150"
          y2="160"
          stroke="black"
          strokeWidth="2"
        />
      )}
      {greseli >= 6 && (
        <>
          <line
            x1="150"
            y1="120"
            x2="120"
            y2="140"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1="150"
            y1="120"
            x2="180"
            y2="140"
            stroke="black"
            strokeWidth="2"
          />
        </>
      )}
      {greseli >= 7 && (
        <>
          <line
            x1="150"
            y1="160"
            x2="120"
            y2="190"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1="150"
            y1="160"
            x2="180"
            y2="190"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1="130"
            y1="45"
            x2="170"
            y2="45"
            stroke="red"
            strokeWidth="3"
          />
        </>
      )}
    </svg>
  );
};

export default SpDesen;
