// outputNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';
import styles from './nodeStyles.module.css';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      label="Output"
      icon="⬇️"
      headerColor="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      inputs={[{ id: 'value' }]}
    >
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Name</label>
        <input
          className={styles.fieldInput}
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
        />
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Type</label>
        <select
          className={styles.fieldSelect}
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};