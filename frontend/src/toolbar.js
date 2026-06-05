// toolbar.js - Ethereal Logic Node Palette
export const PipelineToolbar = () => {
  const nodes = [
    { type: 'customInput',  label: 'Input',     icon: '🔵', bgColor: '#E0F2FE', iconColor: '#0369a1', category: 'I/O' },
    { type: 'customOutput', label: 'Output',    icon: '🟠', bgColor: '#FFEDD5', iconColor: '#c2410c', category: 'I/O' },
    { type: 'llm',          label: 'LLM',       icon: '🧠', bgColor: '#F3E8FF', iconColor: '#7e22ce', category: 'AI' },
    { type: 'text',         label: 'Text',      icon: '📝', bgColor: '#F0FDF4', iconColor: '#166534', category: 'Data' },
    { type: 'filter',       label: 'Filter',    icon: '🔍', bgColor: '#FFF7ED', iconColor: '#c2410c', category: 'Logic' },
    { type: 'api',          label: 'API',       icon: '🌐', bgColor: '#EFF6FF', iconColor: '#1d4ed8', category: 'Data' },
    { type: 'transform',    label: 'Transform', icon: '⚙️', bgColor: '#F0FDF4', iconColor: '#166534', category: 'Logic' },
    { type: 'note',         label: 'Note',      icon: '📌', bgColor: '#FEFCE8', iconColor: '#b45309', category: 'Util' },
    { type: 'merge',        label: 'Merge',     icon: '🔀', bgColor: '#EFF6FF', iconColor: '#1d4ed8', category: 'Logic' },
  ];

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
  };

  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '220px',
      height: '100%',
      background: 'rgba(255,255,255,0.8)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(199,196,215,0.4)',
      boxShadow: '4px 0 20px rgba(70,72,212,0.06)',
      overflow: 'hidden',
      flexShrink: 0,
    },
    header: {
      padding: '16px 16px 12px',
      borderBottom: '1px solid rgba(199,196,215,0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    headerIcon: {
      width: '32px',
      height: '32px',
      borderRadius: '10px',
      background: 'linear-gradient(135deg, #4648d4 0%, #6063ee 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      flexShrink: 0,
    },
    headerTitle: {
      fontSize: '13px',
      fontWeight: '700',
      color: '#0b1c30',
      letterSpacing: '0.02em',
    },
    headerSub: {
      fontSize: '10px',
      color: '#767586',
      marginTop: '1px',
      fontWeight: '500',
    },
    nodeGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '8px',
      padding: '12px',
      overflowY: 'auto',
      flex: 1,
    },
    nodeCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px 8px',
      borderRadius: '12px',
      background: '#ffffff',
      border: '1px solid rgba(199,196,215,0.3)',
      boxShadow: '0 2px 8px rgba(70,72,212,0.05)',
      cursor: 'grab',
      transition: 'all 0.2s',
      userSelect: 'none',
      gap: '6px',
    },
    nodeIcon: {
      width: '36px',
      height: '36px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      transition: 'transform 0.2s',
    },
    nodeLabel: {
      fontSize: '10px',
      fontWeight: '600',
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: '#464554',
      textAlign: 'center',
    },
    footer: {
      padding: '10px 12px',
      borderTop: '1px solid rgba(199,196,215,0.3)',
      fontSize: '10px',
      color: '#767586',
      textAlign: 'center',
      fontWeight: '500',
    },
  };

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerIcon}>🔷</div>
        <div>
          <div style={styles.headerTitle}>Node Palette</div>
          <div style={styles.headerSub}>Drag to canvas</div>
        </div>
      </div>

      {/* Node Grid */}
      <div style={styles.nodeGrid}>
        {nodes.map((node) => (
          <div
            key={node.type}
            draggable
            onDragStart={(e) => onDragStart(e, node.type)}
            style={styles.nodeCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(70,72,212,0.15)';
              e.currentTarget.style.borderColor = 'rgba(70,72,212,0.35)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.querySelector('.node-icon-inner').style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(70,72,212,0.05)';
              e.currentTarget.style.borderColor = 'rgba(199,196,215,0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.querySelector('.node-icon-inner').style.transform = 'scale(1)';
            }}
          >
            <div
              className="node-icon-inner"
              style={{ ...styles.nodeIcon, background: node.bgColor, transition: 'transform 0.2s' }}
            >
              {node.icon}
            </div>
            <span style={styles.nodeLabel}>{node.label}</span>
          </div>
        ))}
      </div>

      {/* Footer hint */}
      <div style={styles.footer}>⚡ {nodes.length} block types available</div>
    </div>
  );
};
