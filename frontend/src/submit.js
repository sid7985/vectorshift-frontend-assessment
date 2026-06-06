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
      const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      
      // Native alert fallback for automated testing
      window.alert(`Pipeline Analysis: \nNodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${data.is_dag}`);
      
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

      {/* Modal Alert for Backend Result */}
      {result && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(11, 28, 48, 0.4)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'fadeIn 0.2s ease-out',
        }}>
          <div style={{
            background: '#fff', borderRadius: '16px', padding: '24px', width: '90%', maxWidth: '400px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)', border: '1px solid rgba(199,196,215,0.5)',
            display: 'flex', flexDirection: 'column', gap: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#0b1c30' }}>Pipeline Analysis Alert</div>
              <button onClick={() => setResult(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#767586' }}>✕</button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
               <div style={{ background: 'rgba(70,72,212,0.06)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                 <div style={{ fontSize: '28px', fontWeight: 800, color: '#4648d4' }}>{result.num_nodes}</div>
                 <div style={{ fontSize: '11px', fontWeight: 600, color: '#767586', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Nodes</div>
               </div>
               <div style={{ background: 'rgba(118,117,134,0.06)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                 <div style={{ fontSize: '28px', fontWeight: 800, color: '#464554' }}>{result.num_edges}</div>
                 <div style={{ fontSize: '11px', fontWeight: 600, color: '#767586', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>Edges</div>
               </div>
            </div>
            
            <div style={{
              background: result.is_dag ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
              borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px'
            }}>
               <div style={{ fontSize: '24px' }}>{result.is_dag ? '✅' : '❌'}</div>
               <div>
                 <div style={{ fontSize: '14px', fontWeight: 700, color: result.is_dag ? '#16a34a' : '#dc2626' }}>
                   {result.is_dag ? 'Valid DAG' : 'Invalid DAG (Cycles Detected)'}
                 </div>
                 <div style={{ fontSize: '12px', color: '#767586', marginTop: '2px' }}>
                   {result.is_dag ? 'The pipeline can be executed successfully.' : 'Please fix cyclic dependencies before running.'}
                 </div>
               </div>
            </div>
            
            <button 
              onClick={() => setResult(null)}
              style={{
                width: '100%', background: 'linear-gradient(135deg, #4648d4 0%, #6063ee 100%)',
                color: '#fff', border: 'none', borderRadius: '8px', padding: '12px',
                fontSize: '14px', fontWeight: 600, cursor: 'pointer', marginTop: '4px',
                boxShadow: '0 4px 12px rgba(70,72,212,0.3)'
              }}
            >
              Close Alert
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
