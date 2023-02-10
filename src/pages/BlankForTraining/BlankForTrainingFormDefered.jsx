import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Loader } from "rsuite";
import { getDataById, getEmptyData } from "./BlankForTraining.services";
import BlankForTraningForm from "./BlankForTrainingForm";

const BlankForTrainingFormDefered = () => {
  const formInfo = useLoaderData();
  return (
    <Suspense
      fallback={
        <>
          <BlankForTraningForm formInfo={null} />
          <Loader
            speed="fast"
            size="md"
            backdrop
            content="loading..."
            vertical
          />
        </>
      }
    >
      <Await
        resolve={formInfo.data}
        errorElement={<h1>Error loading data info</h1>}
      >
        {(formInfo) => <BlankForTraningForm formInfo={formInfo} />}
      </Await>
    </Suspense>
  );
};

export default BlankForTrainingFormDefered;

export function loader({ params }) {
  let data = {};

  if (!params?.blankForTrainingId) {
    data = getEmptyData();
    return data;
  } else {
    return defer({ data: getDataById(params.blankForTrainingId) });
  }
}
