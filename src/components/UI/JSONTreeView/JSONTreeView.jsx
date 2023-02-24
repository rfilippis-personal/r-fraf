import { JSONTree } from "react-json-tree";
import { Panel } from "rsuite";

const JSONTreeView = ({ formValue, formError }) => {
  return (
    <>
      <div>
        <Panel className="json-tree-wrapper" header={<p>formValue</p>}>
          <JSONTree data={formValue} />
        </Panel>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Panel className="json-tree-wrapper" header={<p>formError</p>}>
          <JSONTree data={formError} />
        </Panel>
      </div>
    </>
  );
};

export default JSONTreeView;
