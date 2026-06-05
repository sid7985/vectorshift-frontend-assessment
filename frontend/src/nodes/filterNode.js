// filterNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';
import styles from './nodeStyles.module.css';
import { useStore } from '../store';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <BaseNode
      id={id}
      label="Filter"
      icon="🔍"
      headerBg="linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%)"
      headerColor="#c2410c"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'true' }, { id: 'false' }]}
    >
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Condition</label>
        <input
          className={styles.fieldInput}
          type="text"
          value={condition}
          onChange={(e) => { setCondition(e.target.value); updateNodeField(id, 'condition', e.target.value); }}
          placeholder="e.g. value > 0"
        />
      </div>
      <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
        <span style={{ fontSize: '10px', color: '#22c55e', fontWeight: 600, background: 'rgba(34,197,94,0.1)', padding: '2px 8px', borderRadius: '999px' }}>✔ True</span>
        <span style={{ fontSize: '10px', color: '#ef4444', fontWeight: 600, background: 'rgba(239,68,68,0.1)', padding: '2px 8px', borderRadius: '999px' }}>✘ False</span>
      </div>
    </BaseNode>
  );
};
