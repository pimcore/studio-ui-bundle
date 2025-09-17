import React, { createContext, useEffect, useMemo, useState } from "react";
import { ClassificationStoreModal, ClassificationStoreModalProps } from "../components/classification-store-modal/classification-store-modal";
import ClassificationStoreProvider from "./classification-store-provider";
import useClassificationStore from "./use-classification-store";

export interface IClassificationStoreModalContext {
  modalContext: ClassificationStoreModalProps | undefined
  setModalContext: ( context: ClassificationStoreModalProps | undefined) => void
  fireUpdateEvent: ( data: any ) => void
  dataChangeEvent: ( data: any ) => void
  setDataChangeEvent: ( dataChangeEvent: ( data: any ) => void ) => void
}

export const classificationStoreModalContext = createContext<IClassificationStoreModalContext | undefined>(undefined)

export interface ClassificationStoreModalProviderProps {
  children: React.ReactNode
}

export const ClassificationStoreModalProvider = ({ children }: ClassificationStoreModalProviderProps): React.JSX.Element => {
  const [modalContext, setModalContext] = useState<ClassificationStoreModalProps | undefined>(undefined);
  const [dataChangeEvent, setDataChangeEvent] = useState<(data: any) => void>(() => () => {});

  const fireUpdateEvent = (data: any) => {
    if (dataChangeEvent) {
      dataChangeEvent({...data, modalContext});
    }
  }

  return useMemo(() => (
    <ClassificationStoreProvider>
      <classificationStoreModalContext.Provider value={{ modalContext, setModalContext, fireUpdateEvent, dataChangeEvent, setDataChangeEvent }}>
        {children}

        {modalContext !== undefined && (
          <ClassificationStoreModal
            {...modalContext}
          />
        )}
      </classificationStoreModalContext.Provider>
    </ClassificationStoreProvider>
  ), [modalContext, children])
}

export interface UseClassificationStoreModalProps {
  onUpdate?: ( data: any ) => void
}

export interface UseClassificationStoreModalReturn {
  openModal: (context: ClassificationStoreModalProps) => void
  closeModal: () => void
  fireUpdateEvent: ( data: any ) => void
}

export const useClassificationStoreModal = (props: UseClassificationStoreModalProps): UseClassificationStoreModalReturn => {
  const context = React.useContext(classificationStoreModalContext);
  const classificationStore = useClassificationStore();

  useEffect(() => {
    if (context !== undefined) {
      context.setDataChangeEvent(() => props?.onUpdate);
    }
  }, [context, props?.onUpdate]);

  if (context === undefined) {
    throw new Error('useClassificationStoreModal must be used within a ClassificationStoreModalProvider');
  }

  const openModal = (modalContext: ClassificationStoreModalProps) => {
    context.setModalContext(modalContext);
    classificationStore.openModal();
  };

  const closeModal = () => {
    context.setModalContext(undefined);
    classificationStore.closeModal();
  };

  return {
    openModal,
    closeModal,
    fireUpdateEvent: context.fireUpdateEvent
  };
}

export const useClassificationStoreModalOptional = (props: UseClassificationStoreModalProps): UseClassificationStoreModalReturn | undefined => {
  const context = React.useContext(classificationStoreModalContext);
  const classificationStore = useClassificationStore();
  const { onUpdate } = props;

  useEffect(() => {
    if (context !== undefined) {
      context.setDataChangeEvent(() => onUpdate);
    }
  }, [context, onUpdate]);

  if (context === undefined) {
    return undefined;
  }

  const openModal = (modalContext: ClassificationStoreModalProps) => {
    context.setModalContext(modalContext);
    classificationStore.openModal();
  };

  const closeModal = () => {
    context.setModalContext(undefined);
    classificationStore.closeModal();
  };

  return {
    openModal,
    closeModal,
    fireUpdateEvent: context.fireUpdateEvent
  };
}
