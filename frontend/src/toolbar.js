// toolbar.js - Draggable node palette
export const PipelineToolbar = () => {
  const nodes = [
    { type: 'customInput', label: 'Input', icon: '⬆️', color: '#11998e' },
    { type: 'customOutput', label: 'Output', icon: '⬇️', color: '#f5576c' },
    { type: 'llm', label: 'LLM', icon: '🤖', color: '#764ba2' },
    { type: 'text', label: 'Text', icon: '📝', color: '#00f2fe' },
    { type: 'filter', label: 'Filter', icon: '🔍', color: '#fa709a' },
    { type: 'api', label: 'API', icon: '🌐', color: '#302b63' },
    { type: 'transform', label: 'Transform', icon: '⚙️', color: '#a18cd1' },
    { type: 'note', label: 'Note', icon: '📌', color: '#ffd700' },
    { type: 'merge', label: 'Merge', icon: '🔀', color: '#f7971e' },
  ];

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div style={{
      background: 'linear-gradient(180deg, #12121f 0%, #1a1a2e 100%)',
      padding: '14px 20px',
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      borderBottom: '1px solid #2a2a3e',
      flexWrap: 'wrap',
      boxShadow: '0 2px 20px rgba(0,0,0,0.5)',
    }}>
      <span style={{ color: '#667eea', fontWeight: 700, fontSize: '15px', marginRight: '8px', fontFamily: 'Inter, sans-serif' }}>
        ⚡ VectorShift
      </span>
      <div style={{ width: '1px', height: '30px', background: '#2a2a3e', margin: '0 4px' }} />
      {nodes.map((node) => (
        <div
          key={node.type}
          draggable
          onDragStart={(e) => onDragStart(e, node.type)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            background: '#1e1e2e',
            border: `1.5px solid ${node.color}55`,
            borderRadius: '8px',
            color: '#e0e0ff',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'grab',
            userSelect: 'none',
            transition: 'all 0.15s',
            fontFamily: 'Inter, sans-serif',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = node.color;
            e.currentTarget.style.background = `${node.color}22`;
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = `${node.color}55`;
            e.currentTarget.style.background = '#1e1e2e';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span style={{ fontSize: '14px' }}>{node.icon}</span>
          {node.label}
        </div>
      ))}
    </div>
  );
};