// submit.js - Ethereal Logic inline result panel
import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 20px',
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(199,196,215,0.3)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', justifyContent: 'center' }}>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            background: loading
              ? 'rgba(70,72,212,0.5)'
              : 'linear-gradient(135deg, #4648d4 0%, #6063ee 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '999px',
            padding: '10px 28px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.03em',
            boxShadow: loading ? 'none' : '0 4px 16px rgba(70,72,212,0.35)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 6px 20px rgba(70,72,212,0.5)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 16px rgba(70,72,212,0.35)';
          }}
        >
          {loading ? '⏳ Analyzing...' : '⚡ Analyze Pipeline'}
        </button>

        {/* Node/Edge counts */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{
            fontSize: '11px', fontWeight: 600, color: '#4648d4',
            background: 'rgba(70,72,212,0.08)', borderRadius: '999px',
            padding: '4px 10px', letterSpacing: '0.03em',
          }}>
            {nodes.length} nodes
          </span>
          <span style={{
            fontSize: '11px', fontWeight: 600, color: '#767586',
            background: 'rgba(118,117,134,0.08)', borderRadius: '999px',
            padding: '4px 10px', letterSpacing: '0.03em',
          }}>
            {edges.length} edges
          </span>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: '10px', padding: '10px 14px', width: '100%', maxWidth: '500px',
        }}>
          <span style={{ fontSize: '14px' }}>❌</span>
          <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: 500 }}>{error}</span>
          <button
            onClick={() => setError(null)}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', fontSize: '14px' }}
          >×</button>
        </div>
      )}

      {/* Result panel */}
      {result && (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px',
          width: '100%', maxWidth: '500px',
        }}>
          <div style={{
            background: 'rgba(70,72,212,0.06)', borderRadius: '10px',
            padding: '10px 12px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#4648d4' }}>{result.num_nodes}</div>
            <div style={{ fontSize: '10px', fontWeight: 600, color: '#767586', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>Nodes</div>
          </div>
          <div style={{
            background: 'rgba(118,117,134,0.06)', borderRadius: '10px',
            padding: '10px 12px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#464554' }}>{result.num_edges}</div>
            <div style={{ fontSize: '10px', fontWeight: 600, color: '#767586', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>Edges</div>
          </div>
          <div style={{
            background: result.is_dag ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
            borderRadius: '10px', padding: '10px 12px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '20px' }}>{result.is_dag ? '✅' : '❌'}</div>
            <div style={{
              fontSize: '10px', fontWeight: 600,
              color: result.is_dag ? '#16a34a' : '#dc2626',
              textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px',
            }}>DAG</div>
          </div>
          <button
            onClick={() => setResult(null)}
            style={{
              gridColumn: '1 / -1', background: 'none', border: '1px solid rgba(199,196,215,0.4)',
              borderRadius: '8px', padding: '6px', cursor: 'pointer',
              fontSize: '11px', color: '#767586', fontFamily: "'Inter', sans-serif",
              transition: 'background 0.15s',
            }}
          >Dismiss</button>
        </div>
      )}
    </div>
  );
};
