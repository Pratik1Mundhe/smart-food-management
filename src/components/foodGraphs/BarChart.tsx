import React from "react";
import { BarChart, Bar, XAxis, YAxis, Cell } from "recharts";

interface BarPropTypes {
  wastageData: number[];
}

const WastageBarChart: React.FC<BarPropTypes> = (props) => {
  const { wastageData } = props;

  const data = wastageData.map((value, index) => ({
    name: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"][index],
    value: value,
  }));

  const getColor = (value: number) => {
    if (value <= 25) return "green";
    if (value <= 50) return "orange";
    return "red";
  };

  return (
    <div className="w-[420px] h-[420px] mt-20">
      <BarChart
        width={500}
        height={220}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        className="text-[12px] font-semibold"
      >
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={true}
          padding={{ left: 20, right: 20 }}
        />
        <YAxis
          axisLine={true}
          tickLine={false}
          tick={false}
          domain={[0, 100]}
        />
        <Bar
          dataKey="value"
          background={{ fill: "lightgrey" }}
          barSize={8}
          radius={[10, 10, 10, 10]}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.value)} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default WastageBarChart;
