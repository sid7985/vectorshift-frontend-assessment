// textNode.js - with variable detection
import { useState, useEffect } from 'react';
import { BaseNode } from './baseNode';
import { Handle, Position } from 'reactflow';
import styles from './nodeStyles.module.css';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '');
  const [variables, setVariables] = useState([]);
  const updateNodeField = useStore((s) => s.updateNodeField);

  useEffect(() => {
    const matches = [...text.matchAll(/\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g)];
    const vars = [...new Set(matches.map((m) => m[1]))];
    setVariables(vars);
  }, [text]);

  return (
    <BaseNode
      id={id}
      label="Text"
      icon="📝"
      headerBg="linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)"
      headerColor="#166534"
      outputs={[{ id: 'output' }]}
    >
      {/* Dynamic input handles for variables */}
      {variables.map((v, i) => (
        <Handle
          key={v}
          type="target"
          position={Position.Left}
          id={`${id}-${v}`}
          style={{ top: `${((i + 1) / (variables.length + 1)) * 100}%` }}
          className={styles.handle}
        />
      ))}
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Content</label>
        <textarea
          className={styles.fieldTextarea}
          value={text}
          onChange={(e) => { setText(e.target.value); updateNodeField(id, 'text', e.target.value); }}
          placeholder="Enter text... Use {{variable}} for dynamic inputs"
          rows={4}
        />
      </div>
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
