// baseNode.js - Ethereal Logic reusable base node
import { Handle, Position } from 'reactflow';
import styles from './nodeStyles.module.css';

export const BaseNode = ({ id, label, icon, headerBg, headerColor, inputs = [], outputs = [], children }) => {
  return (
    <div className={styles.nodeContainer}>
      {/* Input handles */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{ top: `${((index + 1) / (inputs.length + 1)) * 100}%` }}
          className={styles.handle}
        />
      ))}

      {/* Node Header */}
      <div
        className={styles.nodeHeader}
        style={{
          background: headerBg || 'linear-gradient(135deg, rgba(70,72,212,0.08) 0%, rgba(96,99,238,0.12) 100%)',
          borderBottom: '1px solid rgba(199,196,215,0.25)',
        }}
      >
        {icon && (
          <span
            className={styles.nodeIcon}
            style={{
              background: headerBg
                ? 'rgba(255,255,255,0.4)'
                : 'rgba(70,72,212,0.1)',
              borderRadius: '8px',
              width: '26px',
              height: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
            }}
          >
            {icon}
          </span>
        )}
        <span
          className={styles.nodeLabel}
          style={{ color: headerColor || '#0b1c30' }}
        >
          {label}
        </span>
      </div>

      {/* Node Body */}
      <div className={styles.nodeBody}>
        {children}
      </div>

      {/* Output handles */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{ top: `${((index + 1) / (outputs.length + 1)) * 100}%` }}
          className={styles.handle}
        />
      ))}
    </div>
  );
};
