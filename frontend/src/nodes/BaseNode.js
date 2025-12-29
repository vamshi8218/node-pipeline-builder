import { Handle, Position } from "reactflow";

const BaseNode = ({ title, inputs = [], outputs = [], children }) => {
  return (
    <div
      style={{
        padding: 10,
        border: "1px solid #333",
        borderRadius: 6,
        background: "#fff",
        minWidth: 180,
        position: "relative",
        overflow: "visible",
      }}
    >
      <strong>{title}</strong>

      {/* INPUT HANDLES (LEFT) */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          id={input.id}
          type="target"
          position={Position.Left}
          style={{
            top: 50 + index * 20,
            background: "#000",
            width: 10,
            height: 10,
            pointerEvents: "all",   // 🔥 THIS IS THE KEY
          }}
        />
      ))}

      <div style={{ marginTop: 10 }}>{children}</div>

      {/* OUTPUT HANDLES (RIGHT) */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          id={output.id}
          type="source"
          position={Position.Right}
          style={{
            top: 50 + index * 20,
            background: "#000",
            width: 10,
            height: 10,
            pointerEvents: "all",   // 🔥 THIS IS THE KEY
          }}
        />
      ))}
    </div>
  );
};

export default BaseNode;
