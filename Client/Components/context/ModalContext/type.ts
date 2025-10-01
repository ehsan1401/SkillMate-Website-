import { ReactNode } from "react";

export type ModalContextType = {
  showModal: (
    content: ReactNode,
    title?: string,
    onOk?: () => boolean | Promise<boolean>,
    errorMessageOnFail?: string,
    width?:number
  ) => void;
  hideModal: () => void;
};
