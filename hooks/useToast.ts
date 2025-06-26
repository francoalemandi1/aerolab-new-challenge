"use client";

import { useState, useCallback } from "react";

interface ToastState {
  isOpen: boolean;
  title: string;
  description: string;
  action?: "added" | "removed";
}

export function useToast() {
  const [toastState, setToastState] = useState<ToastState>({
    isOpen: false,
    title: "",
    description: "",
  });

  const showToast = useCallback(
    (title: string, description: string, action?: "added" | "removed") => {
      setToastState({
        isOpen: true,
        title,
        description,
        action,
      });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToastState(prev => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const showGameCollectedToast = useCallback(
    (gameName: string) => {
      showToast(
        "Game collected",
        `${gameName} has been added to your collection`,
        "added"
      );
    },
    [showToast]
  );

  const showGameRemovedToast = useCallback(
    (gameName: string) => {
      showToast(
        "Game removed",
        `${gameName} has been removed from your collection`,
        "removed"
      );
    },
    [showToast]
  );

  return {
    ...toastState,
    showToast,
    hideToast,
    showGameCollectedToast,
    showGameRemovedToast,
    onOpenChange: hideToast,
  };
}
