# VectorShift Frontend Assessment

A node-based pipeline builder built with **React + ReactFlow** (frontend) and **FastAPI** (backend), submitted as part of the VectorShift technical assessment.

---

## Running the project

**Frontend**
```bash
cd frontend
npm install
npm start
```

**Backend**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

The frontend runs on `http://localhost:3000` and expects the backend at `http://127.0.0.1:8000`.

---

## Architecture decisions

### Part 1 — Node Abstraction

All nodes extend a single `BaseNode` component (`frontend/src/nodes/baseNode.js`).

`BaseNode` accepts:
- `inputs` / `outputs` — arrays of `{ id, label? }` for static handles
- `dynamicInputs` — array of `{ id, label? }` for runtime-generated handles (used by TextNode for `{{variable}}` detection). These are rendered at the container level so percentage-based `top` values are always relative to the full node height, not the body div.
- `label`, `icon`, `headerBg`, `headerColor` — visual customisation per node type

Adding a new node type takes ~10-15 lines — just define the config and pass it to `BaseNode`. The following **9 node types** are implemented (4 required + 5 bonus):

| Node | Category | Description |
|------|----------|-------------|
| Input | I/O | Named input with type selector |
| Output | I/O | Named output with type selector |
| LLM | AI | GPT-4 processor with system + prompt inputs |
| Text | Data | Auto-sizing textarea with `{{variable}}` handle generation |
| Filter | Logic | Conditional branch with true/false outputs |
| API | Data | HTTP request node with method + URL |
| Transform | Logic | Data transformation step |
| Note | Utility | Sticky note for pipeline documentation |
| Merge | Logic | Combines two streams into one output |

### Part 2 — Styling

- **Design system**: `nodeStyles.module.css` — single CSS module shared by all nodes
- **Theme**: Light glassmorphic — `rgba(255,255,255,0.85)` backgrounds, `backdrop-filter: blur(20px)`, subtle indigo (`#4648d4`) accent
- **Color-coded nodes**: each type has a unique pastel gradient header so pipelines are readable at a glance
- **Animated edges**: `smoothstep` type with animated dash and arrowhead
- **Interactive handles**: scale on hover, glow ring on focus

### Part 3 — Text Node

- Regex `/\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g` extracts variable names from the textarea content
- Each unique variable becomes a dynamic left-side `Handle` via the `dynamicInputs` prop on BaseNode
- `useUpdateNodeInternals` is called (deferred with `setTimeout`) whenever the variable set changes, so ReactFlow re-measures edge connections correctly
- Auto-sizing is implemented via a hidden **mirror div** that grows with the content — the textarea is absolutely positioned over it and inherits the height

### Part 4 — Backend Integration

- `submit.js` POSTs `{ nodes, edges }` to `/pipelines/parse` on button click
- Shows live node/edge count badges in the toolbar without requiring a submit
- On response: triggers a native `window.alert` (for automated test compatibility) **and** renders a custom modal with a breakdown card
- DAG detection in `backend/main.py` uses **Kahn's algorithm** (BFS topological sort):
  - Build an adjacency list and in-degree map from edges
  - BFS from all zero-in-degree nodes
  - If visited count equals total node count → no cycles → valid DAG
  - Time complexity: O(V + E)

---

## File structure

```
frontend/src/
├── nodes/
│   ├── baseNode.js       ← shared abstraction (Part 1)
│   ├── inputNode.js
│   ├── outputNode.js
│   ├── llmNode.js
│   ├── textNode.js       ← variable detection + auto-resize (Part 3)
│   ├── filterNode.js     ← bonus
│   ├── apiNode.js        ← bonus
│   ├── transformNode.js  ← bonus
│   ├── noteNode.js       ← bonus
│   ├── mergeNode.js      ← bonus
│   └── nodeStyles.module.css
├── App.js                ← layout shell
├── ui.js                 ← ReactFlow canvas
├── toolbar.js            ← drag-and-drop node palette
├── submit.js             ← pipeline submit + result modal (Part 4)
└── store.js              ← Zustand state (nodes, edges, updateNodeField)

backend/
└── main.py               ← FastAPI + DAG detection (Part 4)
```
