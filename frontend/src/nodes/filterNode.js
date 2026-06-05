// filterNode.js - New Node 1: Filter/Condition Node
import { useState } from 'react';
import { BaseNode } from './baseNode';
import styles from './nodeStyles.module.css';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');
  const [operator, setOperator] = useState(data?.operator || 'contains');

  return (
    <BaseNode
      id={id}
      label="Filter"
      icon="🔍"
      headerColor="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'true' }, { id: 'false' }]}
    >
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Operator</label>
        <select
          className={styles.fieldSelect}
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
        >
          <option value="contains">Contains</option>
          <option value="equals">Equals</option>
          <option value="startsWith">Starts With</option>
          <option value="endsWith">Ends With</option>
          <option value="greaterThan">Greater Than</option>
          <option value="lessThan">Less Than</option>
        </select>
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Value</label>
        <input
          className={styles.fieldInput}
          type="text"
          value={condition}
          placeholder="Enter value..."
          onChange={(e) => setCondition(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#8888aa' }}>
        <span>true →</span>
        <span>false →</span>
      </div>
    </BaseNode>
  );
};