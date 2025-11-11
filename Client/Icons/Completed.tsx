import { SVGProps } from "react";

export function Completed(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from NRK Core Icons by Norsk rikskringkasting - https://creativecommons.org/licenses/by/4.0/ */}<path fill="currentColor" fillRule="evenodd" d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12S5.925 1 12 1s11 4.925 11 11M7 13l1.5-1.5l2 2l5-5L17 10l-6.5 6.5z" clipRule="evenodd" /></svg>
  )
}