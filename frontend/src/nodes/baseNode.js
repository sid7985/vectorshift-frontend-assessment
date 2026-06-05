// baseNode.js - Reusable abstraction for all node types
import { Handle, Position } from 'reactflow';
import styles from './nodeStyles.module.css';

export const BaseNode = ({ id, label, icon, headerColor, inputs = [], outputs = [], children }) => {
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
      <div className={styles.nodeHeader} style={{ background: headerColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        {icon && <span className={styles.nodeIcon}>{icon}</span>}
        <span className={styles.nodeLabel}>{label}</span>
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