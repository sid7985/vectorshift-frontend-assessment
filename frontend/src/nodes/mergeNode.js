// mergeNode.js
import { BaseNode } from './baseNode';

export const MergeNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      label="Merge"
      icon="🔀"
      headerBg="linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)"
      headerColor="#1d4ed8"
      inputs={[
        { id: 'input_a' },
        { id: 'input_b' },
      ]}
      outputs={[{ id: 'merged' }]}
    >
      <div style={{ fontSize: '11px', color: '#767586', lineHeight: 1.5, padding: '4px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1d4ed8', display: 'inline-block' }}></span>
          Input A
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1d4ed8', display: 'inline-block' }}></span>
          Input B
        </div>
        <div style={{ marginTop: '8px', fontSize: '10px', color: '#c7c4d7', fontStyle: 'italic' }}>Combines two streams into one output</div>
      </div>
    </BaseNode>
  );
};
