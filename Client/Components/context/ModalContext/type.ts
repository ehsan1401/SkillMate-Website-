import { ReactNode } from "react";

export type ModalContextType = {
  showModal: (
    content: ReactNode,
    title?: string,
    onOk?: () => boolean | Promise<boolean>,
    errorMessageOnFail?: string,
    width?: number,
    footer?: (helpers: { hideModal: () => void; handleOk: () => void }) => ReactNode
  ) => void;
  hideModal: () => void;
};
