import React from "react";

export default function Skeleton({ height = 16, width = '100%', style = {} }){
  return <div style={{background:'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.04))',borderRadius:6,height,width, ...style}} />;
}
