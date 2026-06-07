// textNode.js - with variable detection and auto-sizing
import { useState, useEffect } from 'react';
import { BaseNode } from './baseNode';
import { useUpdateNodeInternals } from 'reactflow';
import styles from './nodeStyles.module.css';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '');
  const [variables, setVariables] = useState([]);
  const updateNodeField = useStore((s) => s.updateNodeField);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    const matches = [...text.matchAll(/\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g)];
    const vars = [...new Set(matches.map((m) => m[1]))];

    setVariables((prevVars) => {
      if (JSON.stringify(prevVars) !== JSON.stringify(vars)) {
        // Defer so ReactFlow processes the new handles after render
        setTimeout(() => updateNodeInternals(id), 0);
        return vars;
      }
      return prevVars;
    });
  }, [text, id, updateNodeInternals]);

  // Build dynamicInputs for BaseNode so handles are rendered at container
  // level — ensures top-% positioning is relative to the full node height.
  const dynamicInputs = variables.map((v) => ({ id: v, label: v }));

  return (
    <BaseNode
      id={id}
      label="Text"
      icon="📝"
      headerBg="linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)"
      headerColor="#166534"
      outputs={[{ id: 'output' }]}
      dynamicInputs={dynamicInputs}
    >
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Content</label>

        {/* Mirror div forces the wrapper to grow with content */}
        <div style={{ position: 'relative', width: 'fit-content', minWidth: '100%' }}>
          <div
            aria-hidden="true"
            style={{
              visibility: 'hidden',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              padding: '8px 10px',
              fontSize: '13px',
              fontFamily: "'Inter', sans-serif",
              lineHeight: '1.5',
              minHeight: '72px',
              minWidth: '200px',
              border: '1px solid transparent',
            }}
          >
            {text + ' '}
          </div>

          <textarea
            className={styles.fieldTextarea}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              updateNodeField(id, 'text', e.target.value);
            }}
            placeholder="Enter text... Use {{variable}}"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              resize: 'none',   // auto-sizing via mirror; manual resize disabled
              overflow: 'hidden',
            }}
          />
        </div>
      </div>

      {/* Variable chip indicators */}
      {variables.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
          {variables.map((v) => (
            <span key={v} className={styles.varChip}>{`{{${v}}}`}</span>
          ))}
        </div>
      )}
    </BaseNode>
  );
};
