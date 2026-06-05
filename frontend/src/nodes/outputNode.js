// outputNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';
import styles from './nodeStyles.module.css';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <BaseNode
      id={id}
      label="Output"
      icon="🟠"
      headerBg="linear-gradient(135deg, #FFEDD5 0%, #FED7AA 100%)"
      headerColor="#c2410c"
      inputs={[{ id: 'value' }]}
    >
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Variable Name</label>
        <input
          className={styles.fieldInput}
          type="text"
          value={currName}
          onChange={(e) => { setCurrName(e.target.value); updateNodeField(id, 'outputName', e.target.value); }}
          placeholder="output_name"
        />
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Type</label>
        <select
          className={styles.fieldSelect}
          value={outputType}
          onChange={(e) => { setOutputType(e.target.value); updateNodeField(id, 'outputType', e.target.value); }}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};
