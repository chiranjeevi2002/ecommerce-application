import React from "react";
export default function SkeletonCard({ height = 18, width = "100%", className = "" }) {
  return (
    <div className={`placeholder-glow ${className}`} style={{ width }}>
      <div className="bg-light" style={{ borderRadius: 6, width, height }} />
    </div>
  );
}
