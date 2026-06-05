// textNode.js - Part 3: Auto-resize + Dynamic variable handles
import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import styles from './nodeStyles.module.css';

// Extract valid JS variable names from {{ varName }} patterns
const extractVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const vars = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (!vars.includes(match[1])) {
      vars.push(match[1]);
    }
  }
  return vars;
};

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Extract variables whenever text changes
  useEffect(() => {
    setVariables(extractVariables(text));
  }, [text]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [text]);

  const minWidth = 220;
  const charWidth = 8;
  const lineCount = text.split('\n').length;
  const maxLineLen = Math.max(...text.split('\n').map(l => l.length), 10);
  const dynWidth = Math.max(minWidth, maxLineLen * charWidth + 40);

  return (
    <div className={styles.nodeContainer} style={{ minWidth: dynWidth, width: dynWidth }}>
      {/* Dynamic input handles for variables */}
      {variables.map((varName, index) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{ top: `${((index + 1) / (variables.length + 1)) * 100}%` }}
          className={styles.handle}
        />
      ))}

      {/* Variable labels */}
      {variables.map((varName, index) => (
        <div
          key={`label-${varName}`}
          style={{
            position: 'absolute',
            left: '-60px',
            top: `calc(${((index + 1) / (variables.length + 1)) * 100}% - 8px)`,
            fontSize: '10px',
            color: '#8888aa',
            width: '55px',
            textAlign: 'right',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {varName}
        </div>
      ))}

      {/* Header */}
      <div
        className={styles.nodeHeader}
        style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}
      >
        <span className={styles.nodeIcon}>📝</span>
        <span className={styles.nodeLabel}>Text</span>
      </div>

      {/* Body */}
      <div className={styles.nodeBody}>
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Content</label>
          <textarea
            ref={textareaRef}
            className={styles.fieldInput}
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              resize: 'none',
              overflow: 'hidden',
              minHeight: '60px',
              width: '100%',
              boxSizing: 'border-box',
              fontFamily: 'monospace',
              fontSize: '12px',
              lineHeight: '1.5',
            }}
            rows={Math.max(3, lineCount)}
          />
        </div>
        {variables.length > 0 && (
          <div style={{ fontSize: '11px', color: '#667eea' }}>
            🔗 Variables: {variables.join(', ')}
          </div>
        )}
      </div>

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className={styles.handle}
      />
    </div>
  );
};