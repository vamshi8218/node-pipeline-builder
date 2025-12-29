// llmNode.js

import { useState } from "react";
import BaseNode from "./BaseNode";

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || "gpt-3.5");

  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  return (
    <BaseNode
      title="LLM"
      inputs={[
        { id: `${id}-prompt` },
        { id: `${id}-context` },
      ]}
      outputs={[{ id: `${id}-response` }]}
    >
      <label style={{ display: "block" }}>
        Model:
        <select
          value={model}
          onChange={handleModelChange}
          style={{ marginLeft: 6 }}
        >
          <option value="gpt-3.5">GPT-3.5</option>
          <option value="gpt-4">GPT-4</option>
        </select>
      </label>
    </BaseNode>
  );
};
