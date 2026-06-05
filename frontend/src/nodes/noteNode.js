// noteNode.js
import { useState } from 'react';
import styles from './nodeStyles.module.css';
import { useStore } from '../store';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || '');
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <div
      style={{
        position: 'relative',
        minWidth: '200px',
        maxWidth: '280px',
        borderRadius: '12px',
        background: 'rgba(254,252,232,0.9)',
        border: '1px solid rgba(217,119,6,0.25)',
        boxShadow: '0 4px 16px rgba(180,83,9,0.08)',
        fontFamily: "'Inter', sans-serif",
        transition: 'box-shadow 0.2s',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '8px 12px',
          borderBottom: '1px solid rgba(217,119,6,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(254,243,199,0.8)',
          borderRadius: '12px 12px 0 0',
        }}
      >
        <span style={{ fontSize: '13px' }}>📌</span>
        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#b45309' }}>Note</span>
      </div>
      {/* Body */}
      <div className={styles.noteBody}>
        <textarea
          className={styles.noteTextarea}
          value={note}
          onChange={(e) => { setNote(e.target.value); updateNodeField(id, 'note', e.target.value); }}
          placeholder="Add a note..."
          rows={3}
        />
      </div>
    </div>
  );
};
