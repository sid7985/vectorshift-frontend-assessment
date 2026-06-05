// ui.js - Ethereal Logic Pipeline Canvas
import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { FilterNode } from './nodes/filterNode';
import { APINode } from './nodes/apiNode';
import { TransformNode } from './nodes/transformNode';
import { NoteNode } from './nodes/noteNode';
import { MergeNode } from './nodes/mergeNode';
import 'reactflow/dist/style.css';

const gridSize = 24;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  customOutput: OutputNode,
  llm: LLMNode,
  text: TextNode,
  filter: FilterNode,
  api: APINode,
  transform: TransformNode,
  note: NoteNode,
  merge: MergeNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } =
    useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    return { id: nodeID, nodeType: type };
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;
        if (!type) return;
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };
        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const emptyState = nodes.length === 0;

  return (
    <div
      ref={reactFlowWrapper}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapToGrid={true}
        snapGrid={[gridSize, gridSize]}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#4648d4', strokeWidth: 2.5 },
          markerEnd: { type: 'arrowclosed', color: '#4648d4' },
        }}
        fitView
      >
        <Background color="#c7c4d7" gap={24} size={1} />
        <Controls
          style={{
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(199,196,215,0.4)',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(70,72,212,0.08)',
            overflow: 'hidden',
          }}
        />
        <MiniMap
          style={{
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(199,196,215,0.4)',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(70,72,212,0.08)',
          }}
          nodeColor={(node) => {
            const colors = {
              customInput: '#E0F2FE',
              customOutput: '#FFEDD5',
              llm: '#F3E8FF',
              text: '#F0FDF4',
              filter: '#FFF7ED',
              api: '#EFF6FF',
              transform: '#F0FDF4',
              note: '#FEFCE8',
              merge: '#EFF6FF',
            };
            return colors[node.type] || '#e5eeff';
          }}
          maskColor="rgba(70,72,212,0.04)"
        />
      </ReactFlow>

      {/* Empty canvas hint */}
      {emptyState && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.25 }}>🔷</div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#c7c4d7', marginBottom: '6px' }}>
            Drag nodes here
          </div>
          <div style={{ fontSize: '13px', color: '#c7c4d7' }}>
            Drop from the palette to build your pipeline
          </div>
        </div>
      )}
    </div>
  );
};
