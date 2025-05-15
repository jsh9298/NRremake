import { ReactNode } from "react";
import { Rnd } from "react-rnd";

export function RndLayouts({ children }:{children: ReactNode}) {
  return <Rnd
    default={
    {
      x: 200,
      y: 300,
      width: 320,
      height: 200,
    }
  }>
    {children}
  </Rnd>;
}
