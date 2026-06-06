# main.py - VectorShift Backend (FastAPI)
# Part 4: Pipeline parsing with DAG detection

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any, Dict, Optional
from collections import defaultdict, deque

app = FastAPI(title="VectorShift Pipeline API")

# Allow requests from React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Node(BaseModel):
    id: str
    type: Optional[str] = None
    position: Optional[Dict] = None
    data: Optional[Dict] = None


class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None


class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Detect if the pipeline is a Directed Acyclic Graph (DAG).
    Uses Kahn's algorithm (topological sort via BFS).
    """
    if not nodes:
        return True

    node_ids = {node.id for node in nodes}

    # Build adjacency list and in-degree count
    adj = defaultdict(list)
    in_degree = defaultdict(int)

    for node_id in node_ids:
        in_degree[node_id] = 0

    for edge in edges:
        if edge.source in node_ids and edge.target in node_ids:
            adj[edge.source].append(edge.target)
            in_degree[edge.target] += 1

    # Start BFS with all nodes that have no incoming edges
    queue = deque([node_id for node_id in node_ids if in_degree[node_id] == 0])
    visited_count = 0

    while queue:
        current = queue.popleft()
        visited_count += 1

        for neighbor in adj[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If visited all nodes, no cycle exists -> it's a DAG
    return visited_count == len(node_ids)


@app.get("/")
def read_root():
    return {"message": "VectorShift Pipeline API is running!"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    """
    Parse a pipeline and return:
    - num_nodes: total number of nodes
    - num_edges: total number of edges
    - is_dag: whether the pipeline forms a directed acyclic graph
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    pipeline_is_dag = is_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": pipeline_is_dag,
    }