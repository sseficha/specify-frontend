import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { memo, useEffect } from "react";

const { Range } = Slider;

function CustomRange({
  title,
  optionalParams,
  setOptionalParams,
  setSliderVal,
}) {
  useEffect(() => console.log("rerender"));

  return (
    <Range
      allowCross={false}
      defaultValue={[0, 1]}
      min={0}
      max={1}
      step={0.01}
      onChange={(value) => {
        setSliderVal(value);
      }}
      onAfterChange={(value) => {
        setOptionalParams({
          ...optionalParams,
          [title]: { min: value[0], max: value[1] },
        });
      }}
    />
  );
}

export default memo(CustomRange);
