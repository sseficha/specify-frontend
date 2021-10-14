import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

function CustomBarChart({ title, data }) {
  return (
    <>
      <span>{title}</span>
      <div class="row justify-content-center">
        <div class="col-10">
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={data}>
              <XAxis dataKey="group" hide={true} />
              <YAxis hide={true} />
              <Tooltip
                itemStyle={{ backgroundColor: "transparent", color: "white" }}
                contentStyle={{ backgroundColor: "transparent", border: null }}
              />
              <Bar dataKey="sum" fill="#198754" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default CustomBarChart;
