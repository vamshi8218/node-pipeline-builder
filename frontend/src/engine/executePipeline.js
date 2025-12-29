export function executePipeline(nodes, edges) {
  const nodeMap = {};
  nodes.forEach((n) => (nodeMap[n.id] = n));

  // Build adjacency list
  const graph = {};
  edges.forEach((e) => {
    if (!graph[e.source]) graph[e.source] = [];
    graph[e.source].push(e.target);
  });

  const results = {};

  function executeNode(nodeId) {
    if (results[nodeId]) return results[nodeId];

    const node = nodeMap[nodeId];
    if (!node) return null;

    let inputValues = [];

    const parents = edges
      .filter((e) => e.target === nodeId)
      .map((e) => e.source);

    parents.forEach((p) => {
      inputValues.push(executeNode(p));
    });

    let output;

    switch (node.type) {
      case 'customInput':
        output = node.data.value;
        break;

      case 'text':
        output = node.data.text;
        break;

      case 'llm':
        output = `LLM(${inputValues.join(' ')})`;
        break;

      case 'customOutput':
        output = inputValues.join(' ');
        break;

      default:
        output = null;
    }

    results[nodeId] = output;
    return output;
  }

  // Start from output nodes
  const outputNodes = nodes.filter((n) => n.type === 'customOutput');
  const finalResults = outputNodes.map((n) => executeNode(n.id));

  return finalResults;
}
