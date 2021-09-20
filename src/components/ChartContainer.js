import CustomBarChart from "./CustomBarChart";
import CustomSlider from "./CustomSlider";

function ChartContainer({ title, data, optionalParams, setOptionalParams }) {
  return (
    <>
      <CustomBarChart title={title} data={data[title]} />
      <CustomSlider
        optionalParams={optionalParams}
        setOptionalParams={setOptionalParams}
        title={title}
      />
    </>
  );
}

export default ChartContainer;
