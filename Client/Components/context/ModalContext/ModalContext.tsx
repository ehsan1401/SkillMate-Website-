"use client";

import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { ConfigProvider, Modal, theme, Typography } from "antd";
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
  const [modalFooter, setModalFooter] = useState<ReactNode | null>(undefined);
  const [onOkHandler, setOnOkHandler] = useState<
    (() => boolean | Promise<boolean>) | undefined
  >();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [customErrorMessage, setCustomErrorMessage] = useState<string | null>(null);

  const showModal = (
    content: ReactNode,
    title?: string,
    onOk?: () => boolean | Promise<boolean>,
    errorMessageOnFail?: string,
    width?: number | string,
    footer?: (helpers: { hideModal: () => void; handleOk: () => void }) => ReactNode
  ) => {
    setModalContent(content);
    setModalTitle(title || "");
    setOnOkHandler(() => onOk);
    setCustomErrorMessage(errorMessageOnFail || "❌ عملیات ناموفق بود، لطفاً دوباره تلاش کنید");
    setErrorMessage(null);
    setIsVisible(true);
    setModalWidth(width || 520);

    if (footer) {
      setModalFooter(footer({ hideModal, handleOk }));
    } else {
      setModalFooter(undefined);
    }
  };

  const hideModal = () => {
    setIsVisible(false);
    setModalContent(null);
    setModalTitle("");
    setOnOkHandler(undefined);
    setErrorMessage(null);
    setCustomErrorMessage(null);
    setModalFooter(undefined);
  };

  const handleOk = async () => {
    if (onOkHandler) {
      try {
        const result = await onOkHandler();
        if (result) {
          hideModal();
        } else {
          setErrorMessage(customErrorMessage);
        }
      } catch (err) {
        console.log(err)
        setErrorMessage("❌Internal Error!!");
      }
    } else {
      hideModal();
    }
  };


  const { darkAlgorithm, defaultAlgorithm } = theme;
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
 
    setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm : isDark ? darkAlgorithm : defaultAlgorithm
      }}
    >
      <ModalContext.Provider value={{ showModal, hideModal }}>
        {children}
        <Modal
          title={modalTitle}
          open={isVisible}
          onCancel={hideModal}
          onOk={handleOk}
          destroyOnHidden
          width={modalWidth}
          footer={modalFooter}
        >
          {modalContent}
          {errorMessage && (
            <Typography.Text className="block mt-2 text-red-400">
              {errorMessage}
            </Typography.Text>
          )}
        </Modal>
      </ModalContext.Provider>
    </ConfigProvider>
  );
};
