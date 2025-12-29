import { useEffect, useRef } from "react";
import BaseNode from "./BaseNode";
import { useStore } from "../store";

export const TextNode = ({ id, data }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const textareaRef = useRef(null);

  const text = data?.text || "";

  // auto resize
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [text]);

  return (
    <BaseNode
      title="Text"
      inputs={[{ id: `${id}-in` }]}
      outputs={[{ id: `${id}-out` }]}
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) =>
          updateNodeData(id, { ...data, text: e.target.value })
        }
        placeholder="Hello {{name}} your order {{orderId}}"
        style={{
          width: "100%",
          resize: "none",
          overflow: "hidden",
          minHeight: 60,
        }}
      />
    </BaseNode>
  );
};
