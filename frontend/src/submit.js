// submit.js - Part 4: Backend integration
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      alert(
        `📊 Pipeline Analysis Results\n\n` +
        `🔵 Nodes: ${data.num_nodes}\n` +
        `🔷 Edges: ${data.num_edges}\n` +
        `${data.is_dag ? '✅' : '❌'} Is DAG: ${data.is_dag ? 'Yes (no cycles detected)' : 'No (contains cycles)'}`
      );
    } catch (error) {
      alert(`❌ Error connecting to backend:\n${error.message}\n\nMake sure the backend is running on port 8000.`);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '14px',
      background: 'linear-gradient(180deg, #1a1a2e 0%, #12121f 100%)',
      borderTop: '1px solid #2a2a3e',
    }}>
      <button
        onClick={handleSubmit}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 32px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '0.5px',
          boxShadow: '0 4px 15px rgba(102,126,234,0.4)',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-1px)';
          e.target.style.boxShadow = '0 6px 20px rgba(102,126,234,0.6)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 15px rgba(102,126,234,0.4)';
        }}
      >
        ⚡ Analyze Pipeline
      </button>
    </div>
  );
};