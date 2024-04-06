import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PowerLevelChart({ basePowerLevel }) {
  let data = [
    { name: "Base P.L", powerLevel: parseInt(basePowerLevel) },
    { name: "Lowest P.L In Set", powerLevel: 0 },
    { name: "Average Base P.L. In Set", powerLevel: 58979610 },
    { name: "Highest P.L In Set", powerLevel: 440000000 },
  ];

  return (
    <>
      <div style={{ width: "700px", margin: "0 auto" }}>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <YAxis domain={[0, 440000000]} tick={{ fontSize: 12.5 }} />
            <XAxis dataKey="name" />
            <CartesianGrid />
            <Tooltip />
            <Area dataKey="powerLevel" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default PowerLevelChart;
