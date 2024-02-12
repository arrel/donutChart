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
import React from 'react';
import DonutChart from 'path/to/DonutChart';

const MyComponent = () => {
  const graphData = {
    sections: [
      { percentage: 30, color: '#ff0000', animation: 'rotate', title: 'Section 1', subtitle: 'Subtitle 1' },
      { percentage: 50, color: '#00ff00', animation: 'grow', title: 'Section 2', subtitle: 'Subtitle 2' },
      // Add more sections as needed
    ],
    config: {
      delay: 1000, // Delay between animations (in milliseconds)
    },
  };

  return (
    <DonutChart graph={graphData} />
  );
};

export default MyComponent;
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
    - `holeRadius`: The radius of the hole

## All Rights Reserved

This software is proprietary and confidential. All rights are reserved by the author high-haseeb.

You are not allowed to distribute, sublicense, or modify the software in any way without prior written permission from the author.

For licensing inquiries, please contact haseebkhalidoriginal@gmail.com
