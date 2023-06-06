import React from "react";
import { Path, LinearGradient, Defs, Stop, G } from "react-native-svg";
import RenderSvgXml from "./RenderSvgXml";

interface SvgProps {
  xml?: string;
  width?: number | string;
  height?: number | string;
  fill?: string;
  fillOpacity?: string;
  fillRule?: "nonzero" | "evenodd";
  stroke?: string;
  strokeWidth?: string;
  strokeOpacity?: number;
  strokeLinecap?: "butt" | "square" | "round";
  strokeLinejoin?: "miter" | "bevel" | "round";
  strokeDasharray?: string;
  strokeDashoffset?: number;
  x?: number;
  y?: number;
  rotation?: number;
  scale?: number;
  origin?: number;
  originX?: number;
  originY?: number;
  preserveAspectRatio?: string;
  viewBox?: string;
}

/* Below are rendered together with <RenderSvg/> due to its simplicity */
export const quote = ({ fill, fillOpacity }: SvgProps) => (
  <Path
    d="M59.4417 72.7949C59.4557 76.2224 58.7301 79.6124 57.3147 82.7327C55.8994 85.853 53.8276 88.6298 51.2415 90.8729C45.692 95.9474 38.3988 98.6741 30.8885 98.4822C21.3544 98.4822 13.8266 95.1569 8.30512 88.5064C2.78939 81.8935 -0.157562 73.5069 0.00649888 64.8899C0.00649888 44.259 5.65372 28.7338 16.9482 18.3142C28.2426 7.89472 40.7452 2.12618 54.456 1.00862V23.6391C47.5467 24.3764 41.0056 27.1309 35.6446 31.5605C32.8857 33.629 30.6129 36.2785 28.9864 39.3225C27.3599 42.3664 26.4193 45.7307 26.2308 49.1784C28.5079 48.0669 31.0127 47.5041 33.5454 47.5349C41.7347 47.5349 48.098 49.8632 52.6355 54.5196C54.9276 56.958 56.7103 59.8306 57.8791 62.969C59.0479 66.1073 59.5792 69.448 59.4417 72.7949ZM129.144 72.7949C129.161 76.2229 128.437 79.614 127.021 82.7347C125.606 85.8555 123.532 88.6319 120.943 90.8729C115.394 95.9474 108.101 98.6741 100.59 98.4822C91.0781 98.4822 83.6105 95.1569 78.1874 88.5064C72.738 81.8621 69.8306 73.4888 69.9872 64.8899C69.9872 44.259 75.5742 28.7338 86.7484 18.3142C97.9226 7.89472 110.409 2.10425 124.207 0.942871V23.5733C117.313 24.3392 110.795 27.1165 105.461 31.5605C102.682 33.6167 100.388 36.2613 98.7443 39.3063C97.1003 42.3513 96.1459 45.7219 95.9491 49.1784C98.2202 48.0665 100.72 47.5037 103.247 47.5349C111.426 47.5349 117.789 49.8632 122.337 54.5196C124.63 56.9572 126.411 59.8301 127.577 62.9689C128.744 66.1077 129.271 69.4487 129.127 72.7949H129.144Z"
    fill={fill}
    fill-opacity={fillOpacity}
  />
);

export const dislikeBtnSvg = ({ fill, stroke, strokeWidth }: SvgProps) => (
  <Path
    d="M28.125 1.89583C27.3125 1.08333 26 1.08333 25.1875 1.89583L15 12.0625L4.8125 1.875C4 1.0625 2.6875 1.0625 1.875 1.875C1.0625 2.6875 1.0625 4 1.875 4.8125L12.0625 15L1.875 25.1875C1.0625 26 1.0625 27.3125 1.875 28.125C2.6875 28.9375 4 28.9375 4.8125 28.125L15 17.9375L25.1875 28.125C26 28.9375 27.3125 28.9375 28.125 28.125C28.9375 27.3125 28.9375 26 28.125 25.1875L17.9375 15L28.125 4.8125C28.9167 4.02083 28.9167 2.6875 28.125 1.89583Z"
    fill={fill}
    stroke={stroke}
    stroke-width={strokeWidth}
  />
);

export const likeBtnSvg = () => (
  <>
    <Path
      d="M21 38.4792L17.9792 35.7292C7.24999 26 0.166656 19.5833 0.166656 11.7083C0.166656 5.29167 5.20832 0.25 11.625 0.25C15.25 0.25 18.7292 1.9375 21 4.60417C23.2708 1.9375 26.75 0.25 30.375 0.25C36.7917 0.25 41.8333 5.29167 41.8333 11.7083C41.8333 19.5833 34.75 26 24.0208 35.75L21 38.4792Z"
      fill="url(#paint0_linear_2430_1034)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_2430_1034"
        x1="21"
        y1="0.25"
        x2="21"
        y2="38.4792"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF7648" />
        <Stop offset="1" stopColor="#66D38F" />
      </LinearGradient>
    </Defs>
  </>
);

export const scoopLogoSvg = ({ xml, width, height, viewBox }: SvgProps) => (
  <RenderSvgXml xml={xml} height={height} width={width} viewBox={viewBox} />
);

export const SvgComponent = (props: any) => (
  <svg width={16} height={11} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="url(#a)">
      <path
        d="m14 2.397-6 6.3-6-6.3"
        stroke="#8C9FB1"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <filter
        id="a"
        x={0}
        y={0.397}
        width={16}
        height={11.299}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={1} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix values="0 0 0 0 0.351493 0 0 0 0 0.39658 0 0 0 0 0.441667 0 0 0 1 0" />
        <feBlend in2="shape" result="effect1_innerShadow_2430_8701" />
      </filter>
    </defs>
  </svg>
);

export default SvgComponent;
