// apiNode.js - New Node 2: HTTP API Request Node
import { useState } from 'react';
import { BaseNode } from './baseNode';
import styles from './nodeStyles.module.css';

export const APINode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');
  const [headers, setHeaders] = useState(data?.headers || '');

  return (
    <BaseNode
      id={id}
      label="API Request"
      icon="🌐"
      headerColor="linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)"
      inputs={[{ id: 'body' }, { id: 'params' }]}
      outputs={[{ id: 'response' }, { id: 'error' }]}
    >
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Method</label>
        <select
          className={styles.fieldSelect}
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={{ color: method === 'GET' ? '#38ef7d' : method === 'POST' ? '#4facfe' : '#fa709a' }}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>URL</label>
        <input
          className={styles.fieldInput}
          type="text"
          value={url}
          placeholder="https://api.example.com/..."
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Headers (JSON)</label>
        <input
          className={styles.fieldInput}
          type="text"
          value={headers}
          placeholder='{"Authorization": "Bearer ..."}'  
          onChange={(e) => setHeaders(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};