import BaseNode from "./BaseNode";
import { useStore } from "../store";

export const OutputNode = ({ id }) => {
  const outputResult = useStore((state) => state.outputResult);

  return (
    <BaseNode title="Output" inputs={[{ id: `${id}-value` }]} outputs={[]}>
      <div style={{ marginTop: 10 }}>
        <strong>Result:</strong>
        <div
          style={{
            marginTop: 6,
            padding: 8,
            minHeight: 40,
            background: "#f4f4f4",
            borderRadius: 4,
          }}
        >
          {outputResult || "No output yet"}
        </div>
      </div>
    </BaseNode>
  );
};
