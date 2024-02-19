import React, { useState } from "react";
import { OrthographicCamera, PresentationControls, Html, Billboard } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { CSG } from "three-csg-ts";

function springAnimation(
  end,
  setFunction = (e) => console.log("please give a set function"),
  stiffness = 0.2,
  damping = 0.5
) {
  let position = 0;
  let velocity = 0;

  function animate() {
    const force = -stiffness * (position - end);
    const dampingForce = -damping * velocity;
    const acceleration = force + dampingForce;

    velocity += acceleration;
    position += velocity;

    setFunction(position);

    if (Math.abs(position - end) > 0.001) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

const DonutChart = ({ graph, springConfig = { mass: 8, tension: 150, firction: 100 }, ...props }) => {
  THREE.ColorManagement.enabled = true;
  let totalCovered = 0;
  const canvasRef = useRef();
  const [closed, setClosed] = useState(Array.from({ length: graph.sections.length }).fill(true));
  const [opacity, setOpacity] = useState(0);
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      springAnimation(1, setOpacity, 0.1, 1);
      springAnimation(-Math.PI / 5, setRotation, 0.1, 1);
    }, graph.config.delay * graph.sections.length);
  }, []);
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      {...props}
      ref={(el) => (canvasRef.current = el)}
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.6,
        outputEncoding: THREE.LinearSRGBColorSpace,
      }}
    >
      <PresentationControls config={springConfig} domElement={canvasRef.current} rotation={[rotation, 0, 0]}>
        {graph.sections.map((value, i) => {
          const startAngle = (totalCovered * Math.PI * 2) / 100;
          const length = (value.percentage * Math.PI * 2) / 100;
          totalCovered += value.percentage;
          return (
            <group key={i}>
              <Section
                thetaStart={startAngle}
                thetaLength={length}
                color={value.color}
                animationType={value.animation}
                delay={value.immediate ? 0 : i * graph.config.delay}
                outerRadius={graph.config.outerRadius ? graph.config.outerRadius : 2}
                innerRadius={graph.config.innerRadius ? graph.config.innerRadius : 1}
              />
              {value.center ? (
                <></>
              ) : (
                <Html position={[Math.cos((startAngle + length) / 2), 0, Math.cos(startAngle)]} zIndexRange={[100, 0]}>
                  <div style={{ borderColor: value.color, opacity: opacity }} className="chart_card_container">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        pointerEvents: "all",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setClosed((state) => {
                          const newState = [...state];
                          newState[i] = !newState[i];
                          return newState;
                        })
                      }
                    >
                      <div className="chart_card_title">{value.title}</div>
                      <div>{closed[i] ? "▼" : "▲"}</div>
                    </div>
                    <div
                      className="chart_card_subtitle"
                      style={{
                        height: closed[i] ? "0" : "auto",
                        transition: "height 0.5s ease-in-out",
                        overflow: "hidden",
                      }}
                    >
                      {value.subtitle}
                      <p style={{ fontSize: 12 }}>
                        Hi, this is some more info about the thing. Does this fit in the space?
                      </p>
                    </div>
                  </div>
                </Html>
              )}
              {!value.center ? (
                <></>
              ) : (
                <Billboard position={[0, 0, 0.5]}>
                  <Html position={[-graph.config.outerRadius + 0.4, 0, 0]} zIndexRange={[100, 0]}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        opacity: opacity,
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: "1rem",
                          textAlign: "center",
                          width: "20rem",
                        }}
                      >
                        {value.title}
                      </div>
                      <div style={{ fontSize: "2rem", fontWeight: "normal", color: "gray" }}>{value.subtitle}</div>
                    </div>
                  </Html>
                </Billboard>
              )}
            </group>
          );
        })}
      </PresentationControls>
      <ambientLight intensity={2} />
      <directionalLight position={[0, 0, 1]} intensity={1.5} />
      <spotLight position={[0, 3, 0]} />
      <OrthographicCamera
        makeDefault
        position={[0, 0, 10]}
        zoom={100}
        left={-window.innerWidth / 2}
        right={window.innerWidth / 2}
        top={window.innerHeight / 2}
        bottom={-window.innerHeight / 2}
        near={0.1}
        far={1000}
      />
    </Canvas>
  );
};

const Section = React.memo(
  ({
    thetaStart,
    thetaLength,
    color,
    animationType,
    height = 1,
    stiffness = 0.2,
    damping = 1,
    delay = 0,
    outerRadius = 2,
    innerRadius = 1,
  }) => {
    const meshRef = useRef();
    const res = 32;
    useEffect(() => {
      if (!meshRef.current) return;
      let outer, inner, animationTarget;
      let initialValue = 0;
      if (animationType === "rotate") {
        animationTarget = thetaLength;
        outer = new THREE.Mesh(
          new THREE.CylinderGeometry(outerRadius, outerRadius, height, res, 1, false, thetaStart, initialValue)
        );
        inner = new THREE.Mesh(
          new THREE.CylinderGeometry(innerRadius, innerRadius, height, res, 1, false, thetaStart, initialValue)
        );
      } else if (animationType === "grow") {
        animationTarget = height;
        outer = new THREE.Mesh(
          new THREE.CylinderGeometry(outerRadius, outerRadius, initialValue, res, 1, false, thetaStart, thetaLength)
        );
        inner = new THREE.Mesh(
          new THREE.CylinderGeometry(innerRadius, innerRadius, initialValue, res, 1, false, thetaStart, thetaLength)
        );
      }
      const updateDonut = (animatedValue) => {
        outer.geometry.dispose();
        inner.geometry.dispose();
        if (animationType === "grow") {
          outer.geometry = new THREE.CylinderGeometry(
            outerRadius,
            outerRadius,
            animatedValue,
            res,
            1,
            false,
            thetaStart,
            thetaLength
          );
          inner.geometry = new THREE.CylinderGeometry(
            innerRadius,
            innerRadius,
            animatedValue,
            res,
            1,
            false,
            thetaStart,
            thetaLength
          );
        } else if (animationType === "rotate") {
          outer.geometry = new THREE.CylinderGeometry(
            outerRadius,
            outerRadius,
            height,
            res,
            1,
            false,
            thetaStart,
            animatedValue
          );
          inner.geometry = new THREE.CylinderGeometry(
            innerRadius,
            innerRadius,
            height,
            res,
            1,
            false,
            thetaStart,
            animatedValue
          );
        }
        outer.geometry.needsUpdate = true;
        inner.geometry.needsUpdate = true;

        // Perform CSG subtraction
        outer.updateMatrix();
        inner.updateMatrix();
        const subRes = CSG.subtract(outer, inner);
        if (meshRef.current.geometry) {
          meshRef.current.geometry.dispose();
        }
        meshRef.current.geometry = subRes.geometry;
      };

      const timeout = setTimeout(() => {
        springAnimation(animationTarget, updateDonut, stiffness, damping);
      }, delay);

      return () => clearTimeout(timeout);
    }, [meshRef.current]);

    return (
      <mesh ref={meshRef} onUpdate={() => (meshRef.current = this)} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={color} />
      </mesh>
    );
  }
);

export default DonutChart;
