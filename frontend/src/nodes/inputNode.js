// inputNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';
import styles from './nodeStyles.module.css';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <BaseNode
      id={id}
      label="Input"
      icon="🔵"
      headerBg="linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)"
      headerColor="#0369a1"
      outputs={[{ id: 'value' }]}
    >
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Variable Name</label>
        <input
          className={styles.fieldInput}
          type="text"
          value={currName}
          onChange={(e) => { setCurrName(e.target.value); updateNodeField(id, 'inputName', e.target.value); }}
          placeholder="variable_name"
        />
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Type</label>
        <select
          className={styles.fieldSelect}
          value={inputType}
          onChange={(e) => { setInputType(e.target.value); updateNodeField(id, 'inputType', e.target.value); }}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};
