import React, { useState } from "react";

function GrowingButton() {
  const [width, setWidth] = useState(100);

  const increaseWidth = () => setWidth((prewWidth) => prewWidth + 10);
  // const increaseWidth = () => setWidth(Width + 10);
  return (
    <button
      style={{ width, height: "40px", fontSize: "25px" }}
      onClick={increaseWidth}
      type="button"
    >
      I can grow
    </button>
  );
}

export default GrowingButton;
