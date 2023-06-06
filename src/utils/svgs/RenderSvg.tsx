import React from "react";
import { View } from "react-native";
import { StyleProps } from "react-native-reanimated/lib/types/lib/reanimated2/commonTypes";
import Svg from "react-native-svg";

type SvgProps = {
  style?: StyleProps;
  children: JSX.Element;
  width: number;
  height: number;
  viewPortWidth?: number;
  viewPortHeight?: number;
  fill?: string;
  fillOpacity?: string;
  fillRule?: "nonzero" | "evenodd";
  stroke?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  strokeLinecap?: "butt" | "square" | "round";
  strokeLinejoin?: "miter" | "bevel" | "round";
  strokeDasharray?: string;
  strokeDashoffset?: number;
  scale?: number;
  origin?: number;
  originX?: number;
  originY?: number;
  preserveAspectRatio?: string;
};

export const RenderSvg = ({
  fill,
  viewPortWidth,
  viewPortHeight,
  children,
  width,
  height,
  style,
  originX = 0,
  originY = 0,
}: SvgProps) => {
  const acutalWidth = width;
  const acutalHeight = height;
  const aspectRatio = acutalWidth && acutalHeight ? acutalWidth / acutalHeight : 1;

  return (
    <View
      style={{
        width: viewPortWidth,
        height: viewPortHeight,
        ...style,
      }}
    >
      <Svg
        preserveAspectRatio="xMinYMin meet"
        width={acutalWidth}
        height={acutalHeight}
        viewBox={`${originX} ${originY} ${acutalWidth} ${aspectRatio}`}
        fill={fill}
      >
        {children}
      </Svg>
    </View>
  );
};
