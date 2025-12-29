import BaseNode from "./BaseNode";
import { useStore } from "../store";

export const InputNode = ({ id, data }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);

  const name = data?.name ?? "";
  const value = data?.value ?? "";

  return (
    <BaseNode title="Input" inputs={[]} outputs={[{ id: `${id}-out` }]}>
      <div style={{ marginBottom: 8 }}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) =>
            updateNodeData(id, { name: e.target.value })
          }
          style={{ marginLeft: 6 }}
        />
      </div>

      <div>
        <label>Value:</label>
        <input
          type="text"
          value={value}
          onChange={(e) =>
            updateNodeData(id, { value: e.target.value })
          }
          style={{ marginLeft: 6 }}
        />
      </div>
    </BaseNode>
  );
};
