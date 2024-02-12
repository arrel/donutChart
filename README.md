# DonutChart Component

The `DonutChart` component is a React component that allows you to create interactive donut charts in a 3D environment using React Three Fiber and @react-three/drei.

## Installation

To use the `DonutChart` component in your React application, you can install it from npm:

```bash
npm install @react-three/fiber @react-three/drei three three-csg-ts
# or
yarn add @react-three/fiber @react-three/drei three three-csg-ts
```

## Usage

Here's an example of how to use the `DonutChart` component:

```jsx
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
    config: {
      height: 1,
      delay: 1000,
      outerRadius: 2,
      innerRadius: 5,
    },
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
```

## Props

- `graph`: Object containing the data for the donut chart. It should have the following structure:
  - `sections`: An array of objects representing each section of the chart. Each object should have:
    - `percentage`: The percentage of the chart covered by this section.
    - `color`: The color of the section.
    - `animation`: The type of animation for this section (`rotate` or `grow`).
    - `title`: The title of the section.
    - `subtitle`: The subtitle of the section.
  - `config`: An object containing additional configuration options for the chart. Currently, it only supports:
    - `delay`: Delay between animations (in milliseconds).
    - `height`: The height of the graph
    - `outerRadius`: The size of the graph
    - `innerRadius`: The radius of the hole
- `springConfig`: Object to control the behaviour of the chart movement. It supports following parameters:
  - `mass`: The mass of the chart
  - `tension`: The tension in the spring
  - `friction`: The damping force

## All Rights Reserved

This software is proprietary and confidential. All rights are reserved by the author high-haseeb.

You are not allowed to distribute, sublicense, or modify the software in any way without prior written permission from the author.

For licensing inquiries, please contact <haseebkhalidoriginal@gmail.com>
