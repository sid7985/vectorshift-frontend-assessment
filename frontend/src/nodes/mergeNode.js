// mergeNode.js - New Node 5: Merge/Combine multiple inputs
import { useState } from 'react';
import { BaseNode } from './baseNode';
import styles from './nodeStyles.module.css';

export const MergeNode = ({ id, data }) => {
  const [numInputs, setNumInputs] = useState(data?.numInputs || 2);
  const [separator, setSeparator] = useState(data?.separator || '\n');

  const inputs = Array.from({ length: numInputs }, (_, i) => ({ id: `input${i + 1}` }));

  return (
    <BaseNode
      id={id}
      label="Merge"
      icon="🔀"
      headerColor="linear-gradient(135deg, #f7971e 0%, #ffd200 100%)"
      inputs={inputs}
      outputs={[{ id: 'merged' }]}
    >
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Inputs Count</label>
        <input
          className={styles.fieldInput}
          type="number"
          min="2"
          max="8"
          value={numInputs}
          onChange={(e) => setNumInputs(Math.min(8, Math.max(2, parseInt(e.target.value) || 2)))}
        />
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Separator</label>
        <select
          className={styles.fieldSelect}
          value={separator}
          onChange={(e) => setSeparator(e.target.value)}
        >
          <option value="\n">New Line</option>
          <option value=", ">Comma</option>
          <option value=" | ">Pipe</option>
          <option value=" ">Space</option>
          <option value="">None</option>
        </select>
      </div>
      <div style={{ fontSize: '11px', color: '#8888aa', textAlign: 'center' }}>
        {numInputs} inputs → 1 merged output
      </div>
    </BaseNode>
  );
};