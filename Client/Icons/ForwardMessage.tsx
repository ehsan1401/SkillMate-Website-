import { SVGProps } from "react";

export function ForwardMessage(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Iconoir by Luca Burgio - https://github.com/iconoir-icons/iconoir/blob/main/LICENSE */}<g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"><path strokeLinejoin="round" d="m7 8l5 3l5-3" /><path d="M10 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6.857" /><path strokeLinejoin="round" d="M22 17.111h-6.3c-3.6 0-3.6 4.889 0 4.889m6.3-4.889L18.85 14M22 17.111l-3.15 3.111" /></g></svg>
  )
}