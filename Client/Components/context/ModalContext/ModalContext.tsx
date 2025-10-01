"use client";

import { createContext, FC, ReactNode, useContext, useState } from "react";
import { Modal, Typography } from "antd";
import { ModalContextType } from "./type";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalWidth, setModalWidth] = useState<number | string>(520);
  const [onOkHandler, setOnOkHandler] = useState<
    (() => boolean | Promise<boolean>) | undefined
  >();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [customErrorMessage, setCustomErrorMessage] = useState<string | null>(null);

  // نمایش مودال با امکان تعیین متن خطای دلخواه
  const showModal = (
    content: ReactNode,
    title?: string,
    onOk?: () => boolean | Promise<boolean>,
    errorMessageOnFail?: string,
    width?: number | string
  ) => {
    setModalContent(content);
    setModalTitle(title || "");
    setOnOkHandler(() => onOk);
    setCustomErrorMessage(errorMessageOnFail || "❌ عملیات ناموفق بود، لطفاً دوباره تلاش کنید");
    setErrorMessage(null);
    setIsVisible(true);
    setModalWidth(width || 520);
  };

  const hideModal = () => {
    setIsVisible(false);
    setModalContent(null);
    setModalTitle("");
    setOnOkHandler(undefined);
    setErrorMessage(null);
    setCustomErrorMessage(null);
  };

  const handleOk = async () => {
    if (onOkHandler) {
      try {
        const result = await onOkHandler();
        if (result) {
          hideModal(); // تابع true برگردوند → مودال بسته میشه
        } else {
          setErrorMessage(customErrorMessage); // نمایش خطای دلخواه
        }
      } catch (err) {
        setErrorMessage("❌ خطای داخلی رخ داد");
      }
    } else {
      hideModal();
    }
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}

      <Modal
        title={modalTitle}
        open={isVisible}
        onCancel={hideModal}
        onOk={handleOk}
        destroyOnHidden
        width={modalWidth}
      >
        {modalContent}
        {errorMessage && (
          <Typography.Text type="danger" style={{ display: "block", marginTop: 10 }}>
            {errorMessage}
          </Typography.Text>
        )}
      </Modal>
    </ModalContext.Provider>
  );
};
