// llmNode.js
import { BaseNode } from './baseNode';
import styles from './nodeStyles.module.css';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      label="LLM Engine"
      icon="🧠"
      headerBg="linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)"
      headerColor="#7e22ce"
      inputs={[
        { id: 'system_prompt' },
        { id: 'prompt' },
      ]}
      outputs={[{ id: 'response' }]}
    >
      <div style={{ fontSize: '12px', color: '#767586', lineHeight: 1.5 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontWeight: 600, color: '#464554' }}>Model</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#7e22ce', fontSize: '11px' }}>GPT-4</span>
        </div>
        <div style={{
          background: 'rgba(243,232,255,0.4)',
          borderRadius: '8px',
          padding: '8px 10px',
          fontSize: '11px',
          color: '#767586',
          lineHeight: 1.5,
        }}>
          Processes prompts with an LLM and returns the generated response.
        </div>
      </div>
    </BaseNode>
  );
};
