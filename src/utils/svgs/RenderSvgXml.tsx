import * as React from "react";
import { SvgXml } from "react-native-svg";

type SvgProps = {
  xml: string;
  width?: number | string;
  height?: number | string;
  viewBox?: string;
};

const RenderSvgXml = ({ xml, width, height, viewBox }: any) => <SvgXml xml={xml} width={width} height={height} viewBox={viewBox} />

export default RenderSvgXml;
