// transformNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';
import styles from './nodeStyles.module.css';
import { useStore } from '../store';

export const TransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'uppercase');
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <BaseNode
      id={id}
      label="Transform"
      icon="⚙️"
      headerBg="linear-gradient(135deg, #F0FDF4 0%, #BBF7D0 100%)"
      headerColor="#166534"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'output' }]}
    >
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Operation</label>
        <select
          className={styles.fieldSelect}
          value={operation}
          onChange={(e) => { setOperation(e.target.value); updateNodeField(id, 'operation', e.target.value); }}
        >
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="trim">Trim</option>
          <option value="reverse">Reverse</option>
          <option value="json_parse">JSON Parse</option>
          <option value="json_stringify">JSON Stringify</option>
        </select>
      </div>
    </BaseNode>
  );
};
