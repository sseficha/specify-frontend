import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const { Range } = Slider;

function CustomSlider({ title, optionalParams, setOptionalParams }) {
  return (
    <div style={{ display: "flex" }}>
      {/* <span>{range.min}</span> */}
      <Range
        allowCross={false}
        defaultValue={[0, 1]}
        min={0}
        max={1}
        step={0.01}
        onAfterChange={(value) => {
          setOptionalParams({
            ...optionalParams,
            [title]: { min: value[0], max: value[1] },
          });
        }}
      />
      {/* <span>{range.max}</span> */}
    </div>
  );
}

export default CustomSlider;
