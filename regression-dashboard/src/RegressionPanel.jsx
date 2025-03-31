import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";

const RegressionPanel = () => {
  const [data, setData] = useState([]);
  const [model, setModel] = useState(null);

  useEffect(() => {
    console.log("📡 正在请求 Lambda API...");
    fetch("https://o6c9qk7r46.execute-api.ap-northeast-1.amazonaws.com/prod/regression?channel=Twitter")
      .then(res => res.json())
      .then(res => {
        const parsed = JSON.parse(res.body); // 👈 Lambda 返回的是字符串，要再解析
        console.log("✅ Lambda 返回数据：", parsed);
        console.log("📊 图表数据：", parsed.data);
        setModel(parsed);
        setData(parsed.data);
      })
      .catch(err => {
        console.error("❌ 请求失败：", err);
      });
  }, []);

  const { r2, coef } = model || {};
  const { intercept, impressions, conversions } = coef || {};

  return (
    <div style={{ padding: "2rem" }}>
      <h2>回归分析结果（Twitter）</h2>

      {model && coef ? (
        <div>
          <p>R²: {r2?.toFixed(3)}</p>
          <p>截距: {intercept?.toFixed(2)}</p>
          <p>impressions 系数: {impressions?.toFixed(2)}</p>
          <p>conversions 系数: {conversions?.toFixed(2)}</p>
        </div>
      ) : (
        <p>加载中...</p>
      )}

      <LineChart width={700} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="clicks"
          stroke="#8884d8"
          name="实际点击数"
        />
        <Line
          type="monotone"
          dataKey="predicted_clicks"
          stroke="#82ca9d"
          name="预测点击数"
        />
      </LineChart>
    </div>
  );
};

export default RegressionPanel;