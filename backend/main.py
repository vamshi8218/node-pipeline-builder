from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- MODELS ----------------

class Node(BaseModel):
    id: str
    type: str
    data: Dict

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

# ---------------- DAG VALIDATION ----------------

def is_dag(nodes, edges):
    graph = {node.id: [] for node in nodes}

    for edge in edges:
        graph[edge.source].append(edge.target)

    visited = set()
    stack = set()

    def dfs(node):
        if node in stack:
            return False
        if node in visited:
            return True

        visited.add(node)
        stack.add(node)

        for neighbor in graph.get(node, []):
            if not dfs(neighbor):
                return False

        stack.remove(node)
        return True

    return all(dfs(node.id) for node in nodes)

# ---------------- PIPELINE EXECUTION ----------------

def execute_pipeline(nodes, edges):
    node_map = {node.id: node for node in nodes}

    graph = {node.id: [] for node in nodes}
    reverse_graph = {node.id: [] for node in nodes}

    for edge in edges:
        graph[edge.source].append(edge.target)
        reverse_graph[edge.target].append(edge.source)

    results = {}
    input_values = {}

    def run_node(node_id):
        if node_id in results:
            return results[node_id]

        node = node_map[node_id]

        # execute parents first
        parent_outputs = [run_node(p) for p in reverse_graph[node_id]]

        if node.type == "customInput":
            value = node.data.get("value", "")
            name = node.data.get("name", node_id)
            input_values[name] = value
            output = value

        elif node.type == "text":
            text = node.data.get("text", "")
            # TEMPLATE REPLACEMENT
            for key, val in input_values.items():
                text = text.replace(f"{{{{{key}}}}}", str(val))
            output = text

        elif node.type == "llm":
            output = f"LLM_RESPONSE({ ' '.join(parent_outputs) })"

        elif node.type == "customOutput":
            output = " ".join(parent_outputs)

        else:
            output = ""

        results[node_id] = output
        return output

    final_outputs = []
    for node in nodes:
        if node.type == "customOutput":
            final_outputs.append(run_node(node.id))

    return final_outputs

# ---------------- ROUTES ----------------

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    return {
        "num_nodes": len(pipeline.nodes),
        "num_edges": len(pipeline.edges),
        "is_dag": is_dag(pipeline.nodes, pipeline.edges)
    }

@app.post("/pipelines/execute")
def execute_pipeline_api(pipeline: Pipeline):
    if not is_dag(pipeline.nodes, pipeline.edges):
        return {
            "is_dag": False,
            "output": None
        }

    output = execute_pipeline(pipeline.nodes, pipeline.edges)

    return {
        "is_dag": True,
        "output": output
    }

@app.get("/")
def root():
    return {"ping": "pong"}
