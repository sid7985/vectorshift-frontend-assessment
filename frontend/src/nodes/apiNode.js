// apiNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';
import styles from './nodeStyles.module.css';
import { useStore } from '../store';

export const APINode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <BaseNode
      id={id}
      label="API"
      icon="🌐"
      headerBg="linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)"
      headerColor="#1d4ed8"
      inputs={[{ id: 'body' }]}
      outputs={[{ id: 'response' }]}
    >
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Method</label>
        <select
          className={styles.fieldSelect}
          value={method}
          onChange={(e) => { setMethod(e.target.value); updateNodeField(id, 'method', e.target.value); }}
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>URL</label>
        <input
          className={styles.fieldInput}
          type="text"
          value={url}
          onChange={(e) => { setUrl(e.target.value); updateNodeField(id, 'url', e.target.value); }}
          placeholder="https://api.example.com/endpoint"
        />
      </div>
    </BaseNode>
  );
};
