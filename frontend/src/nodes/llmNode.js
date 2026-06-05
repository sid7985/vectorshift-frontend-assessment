// llmNode.js
import { BaseNode } from './baseNode';
import styles from './nodeStyles.module.css';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      label="LLM"
      icon="🤖"
      headerColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      inputs={[
        { id: 'system' },
        { id: 'prompt' },
      ]}
      outputs={[{ id: 'response' }]}
    >
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Model</label>
        <select className={styles.fieldSelect} defaultValue="gpt-4o">
          <option value="gpt-4o">GPT-4o</option>
          <option value="gpt-4-turbo">GPT-4 Turbo</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="claude-3-opus">Claude 3 Opus</option>
          <option value="claude-3-sonnet">Claude 3 Sonnet</option>
          <option value="gemini-pro">Gemini Pro</option>
        </select>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
        <div style={{ fontSize: '11px', color: '#8888aa' }}>system ←</div>
        <div style={{ fontSize: '11px', color: '#8888aa' }}>prompt ←</div>
        <div style={{ fontSize: '11px', color: '#8888aa' }}>response →</div>
      </div>
    </BaseNode>
  );
};