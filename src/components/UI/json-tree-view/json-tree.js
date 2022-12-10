import { JSONTree } from "react-json-tree";
import { Panel } from "rsuite";

const JSONTreeView = ({ formValue, formError }) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <Panel className="json-tree-wrapper" header={<p>formValue</p>}>
        <JSONTree data={formValue} />
      </Panel>

      <Panel className="json-tree-wrapper" header={<p>formError</p>}>
        <JSONTree data={formError} />
      </Panel>
    </div>
  );
};

export default JSONTreeView;
