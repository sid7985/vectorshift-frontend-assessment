// noteNode.js - New Node 4: Annotation / Note Node (no connections)
import { useState } from 'react';
import styles from './nodeStyles.module.css';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || 'Add your annotation here...');
  const [color, setColor] = useState(data?.color || '#ffd700');

  return (
    <div
      className={styles.nodeContainer}
      style={{
        borderColor: color,
        boxShadow: `0 4px 24px ${color}33`,
        minWidth: 200,
      }}
    >
      <div
        className={styles.nodeHeader}
        style={{ background: color, color: '#1a1a2e' }}
      >
        <span className={styles.nodeIcon}>📌</span>
        <span className={styles.nodeLabel}>Note</span>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{
            width: '20px',
            height: '20px',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            background: 'transparent',
          }}
          title="Pick note color"
        />
      </div>
      <div className={styles.nodeBody}>
        <textarea
          className={styles.fieldInput}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{
            minHeight: '80px',
            resize: 'none',
            fontStyle: 'italic',
            fontSize: '12px',
          }}
          rows={4}
        />
      </div>
    </div>
  );
};