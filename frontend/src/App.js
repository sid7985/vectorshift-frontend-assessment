// App.js - Ethereal Logic Layout
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './index.css';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        background: '#F8FAFC',
      }}
    >
      {/* Top App Bar */}
      <header
        style={{
          height: '52px',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(199,196,215,0.35)',
          boxShadow: '0 1px 8px rgba(70,72,212,0.06)',
          zIndex: 50,
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #4648d4 0%, #6063ee 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
            }}
          >
            🔷
          </div>
          <span
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#0b1c30',
              letterSpacing: '-0.02em',
            }}
          >
            VectorShift
          </span>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 600,
              color: '#4648d4',
              background: 'rgba(70,72,212,0.08)',
              padding: '2px 8px',
              borderRadius: '999px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Canvas
          </span>
        </div>

        {/* Nav Links */}
        <nav style={{ display: 'flex', gap: '4px' }}>
          {['Canvas', 'Analysis', 'Library'].map((item, i) => (
            <button
              key={item}
              style={{
                padding: '6px 12px',
                borderRadius: '999px',
                border: 'none',
                background: i === 0 ? 'rgba(70,72,212,0.08)' : 'transparent',
                color: i === 0 ? '#4648d4' : '#767586',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                transition: 'all 0.15s',
              }}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            style={{
              background: 'linear-gradient(135deg, #4648d4, #6063ee)',
              color: '#fff',
              border: 'none',
              borderRadius: '999px',
              padding: '7px 16px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              boxShadow: '0 2px 10px rgba(70,72,212,0.3)',
            }}
          >
            Deploy
          </button>
        </div>
      </header>

      {/* Main workspace */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Node Palette Sidebar */}
        <PipelineToolbar />

        {/* Canvas + Submit */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <PipelineUI />
          </div>
          <SubmitButton />
        </div>
      </div>
    </div>
  );
}

export default App;
