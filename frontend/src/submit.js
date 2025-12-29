import { useStore } from "./store";

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const setOutputResult = useStore((state) => state.setOutputResult);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/pipelines/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      const result = await res.json();

      if (!result.is_dag) {
        alert("Pipeline is not a valid DAG");
        return;
      }

      // ✅ STORE OUTPUT (no alert)
      setOutputResult(result.output.join("\n"));
    } catch (err) {
      console.error(err);
      alert("Execution failed");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
