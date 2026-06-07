// baseNode.js - Ethereal Logic reusable base node
import { Handle, Position } from 'reactflow';
import styles from './nodeStyles.module.css';

/**
 * BaseNode — the single source of truth for all node rendering.
 *
 * Props:
 *   id           — ReactFlow node id
 *   label        — displayed in the header
 *   icon         — emoji or element shown in the header
 *   headerBg     — CSS background for the header (gradient string)
 *   headerColor  — text color for the header label
 *   inputs       — array of { id, label? } for static left-side handles
 *   outputs      — array of { id, label? } for static right-side handles
 *   dynamicInputs — array of { id, label? } for runtime-generated left handles
 *                   (e.g. TextNode variables). Rendered at container level so
 *                   percentage-based `top` values are always relative to the
 *                   full node height, not the body div.
 *   children     — node body content
 */
export const BaseNode = ({
  id,
  label,
  icon,
  headerBg,
  headerColor,
  inputs = [],
  outputs = [],
  dynamicInputs = [],
  children,
}) => {
  // Combine static + dynamic inputs for evenly-spaced positioning
  const allInputs = [...inputs, ...dynamicInputs];

  return (
    <div className={styles.nodeContainer}>
      {/* Static input handles */}
      {inputs.map((input, index) => {
        const posIndex = allInputs.indexOf(input);
        return (
          <Handle
            key={input.id}
            type="target"
            position={Position.Left}
            id={`${id}-${input.id}`}
            style={{ top: `${((posIndex + 1) / (allInputs.length + 1)) * 100}%` }}
            className={styles.handle}
          >
            {input.label && (
              <span className={styles.handleLabel} style={{ left: '16px' }}>
                {input.label}
              </span>
            )}
          </Handle>
        );
      })}

      {/* Dynamic input handles (e.g. TextNode {{variable}} handles) —
          rendered at container level so top-% is relative to the full node */}
      {dynamicInputs.map((input, index) => {
        const posIndex = inputs.length + index;
        return (
          <Handle
            key={input.id}
            type="target"
            position={Position.Left}
            id={`${id}-${input.id}`}
            style={{ top: `${((posIndex + 1) / (allInputs.length + 1)) * 100}%` }}
            className={styles.handle}
          >
            {input.label && (
              <span className={styles.handleLabel} style={{ left: '16px' }}>
                {input.label}
              </span>
            )}
          </Handle>
        );
      })}

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
              background: headerBg ? 'rgba(255,255,255,0.4)' : 'rgba(70,72,212,0.1)',
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
        <span className={styles.nodeLabel} style={{ color: headerColor || '#0b1c30' }}>
          {label}
        </span>
      </div>

      {/* Node Body */}
      <div className={styles.nodeBody}>{children}</div>

      {/* Output handles */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{ top: `${((index + 1) / (outputs.length + 1)) * 100}%` }}
          className={styles.handle}
        >
          {output.label && (
            <span className={styles.handleLabel} style={{ right: '16px' }}>
              {output.label}
            </span>
          )}
        </Handle>
      ))}
    </div>
  );
};
