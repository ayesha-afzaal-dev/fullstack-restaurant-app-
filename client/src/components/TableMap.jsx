import React from "react";

function TableMap({ tables, availableTableIds, selectedTable, onSelect }) {
  return (
    <div
      className="rounded-4 position-relative"
      style={{
        backgroundColor: "#EAF1F8",
        border: "1px solid rgba(91,137,181,0.2)",
        height: "320px",
        overflow: "hidden",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          fontSize: "0.75rem",
          color: "#94A3B8",
          letterSpacing: "1px",
        }}
      >
        FLOOR PLAN
      </span>

      {tables.map((table) => {
        const isAvailable = availableTableIds.includes(table.id);
        const isSelected = selectedTable?.id === table.id;

        return (
          <div
            key={table.id}
            onClick={() => isAvailable && onSelect(table)}
            style={{
              position: "absolute",
              left: `${table.x}%`,
              top: `${table.y}%`,
              transform: "translate(-50%, -50%)",
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: isAvailable ? "pointer" : "not-allowed",
              backgroundColor: isSelected ? "#5B89B5" : isAvailable ? "#FFFFFF" : "#FEECEC",
              border: `2px solid ${isSelected ? "#5B89B5" : isAvailable ? "rgba(91,137,181,0.3)" : "rgba(192,57,43,0.3)"}`,
              transition: "all 0.25s ease",
              boxShadow: isSelected ? "0 8px 16px rgba(91,137,181,0.3)" : "none",
            }}
          >
            <strong style={{ fontSize: "0.85rem", color: isSelected ? "#fff" : "#2D3B4E" }}>
              T{table.number}
            </strong>
            <span style={{ fontSize: "0.65rem", color: isSelected ? "#fff" : isAvailable ? "#5B89B5" : "#C0392B" }}>
              {isAvailable ? "Free" : "Booked"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default TableMap;