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
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="group" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sum" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default CustomBarChart;
