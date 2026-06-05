// transformNode.js - New Node 3: Data Transform Node
import { useState } from 'react';
import { BaseNode } from './baseNode';
import styles from './nodeStyles.module.css';

export const TransformNode = ({ id, data }) => {
  const [transform, setTransform] = useState(data?.transform || 'uppercase');
  const [customCode, setCustomCode] = useState(data?.customCode || '');

  return (
    <BaseNode
      id={id}
      label="Transform"
      icon="⚙️"
      headerColor="linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'output' }]}
    >
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Operation</label>
        <select
          className={styles.fieldSelect}
          value={transform}
          onChange={(e) => setTransform(e.target.value)}
        >
          <option value="uppercase">UPPERCASE</option>
          <option value="lowercase">lowercase</option>
          <option value="trim">Trim Whitespace</option>
          <option value="json_parse">JSON Parse</option>
          <option value="json_stringify">JSON Stringify</option>
          <option value="base64_encode">Base64 Encode</option>
          <option value="base64_decode">Base64 Decode</option>
          <option value="custom">Custom JavaScript</option>
        </select>
      </div>
      {transform === 'custom' && (
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Custom Code</label>
          <input
            className={styles.fieldInput}
            type="text"
            value={customCode}
            placeholder="(input) => input.split(',').reverse()"
            onChange={(e) => setCustomCode(e.target.value)}
          />
        </div>
      )}
    </BaseNode>
  );
};