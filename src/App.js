import "./App.css";
import DonutChart from "./donutChart";
import { Color } from "three";

export default function Home() {
  const colors = ["#FFC800", "#8162C4", "#6334C8"];
  const sections = {
    sections: [
      {
        percentage: 60,
        border: "#FFC800",
        color: new Color().setHSL(0.078, 1, 0.52),
        animation: "rotate",
        title: "Primer Foundation Scholarship",
        subtitle: "$8,960",
      },
      {
        percentage: 30,
        color: colors[1],
        animation: "rotate",
        title: "Primer Tuition",
        subtitle: "$18,500",
        center: true,
      },
      {
        percentage: 10,
        color: colors[2],
        animation: "rotate",
        title: "Family Responsibility",
        subtitle: "$8,280",
      },
    ],
    config: { height: 1, delay: 600, outerRadius: 2, innerRadius: 1 },
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
