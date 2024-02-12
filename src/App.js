import "./App.css";
import DonutChart from "./donutChart";

export default function Home() {
  const colors = ["#FFC800", "#8162C4", "#6334C8"];
  const sections = {
    sections: [
      { percentage: 50, color: colors[0], animation: "rotate", title: "Primer Foundation Scholarship", subtitle: "$8,960" },
      { percentage: 20, color: colors[1], animation: "grow", title: "Primer Tuition", subtitle: "$18,500" },
      { percentage: 30, color: colors[2], animation: "grow", title: "Family Responsibility", subtitle: "$8,280" },
    ],
    config: { height: 1,
      delay: 1000, outerRadius: 2, innerRadius: 1 },
  };
  const springConfig = {
    mass: 10,
    tension: 100,
    firction: 40,
  };
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <DonutChart graph={sections} springConfig={springConfig} />
    </div>
  );
}
