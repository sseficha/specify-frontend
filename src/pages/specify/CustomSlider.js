import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import CustomRange from "./CustomRange";

const { Range } = Slider;

function CustomSlider({ title, optionalParams, setOptionalParams }) {
  const [sliderVal, setSliderVal] = useState([0, 1]);

  return (
    <div class="row align-items-center">
      <div class="col-1">
        <span>{sliderVal[0]}</span>
      </div>
      <div class="col-10">
        <CustomRange
          title={title}
          optionalParams={optionalParams}
          setOptionalParams={setOptionalParams}
          setSliderVal={setSliderVal}
        />
      </div>
      {/* <Range
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
      /> */}
      <div class="col-1">
        <span>{sliderVal[1]}</span>
      </div>
    </div>
  );
}

export default CustomSlider;
