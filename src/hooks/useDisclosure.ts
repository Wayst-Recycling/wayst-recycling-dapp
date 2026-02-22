'use client';

import { useCallback, useState } from 'react';

import logger from '@/lib/utils/logger';

interface UseDisclosureProps {
  onOpen?(): void | Promise<void>;
  onClose?(): void | Promise<void>;
  defaultIsOpen?: boolean;
}

export function useDisclosure({
  onOpen: onOpenProp,
  onClose: onCloseProp,
  defaultIsOpen = false,
}: UseDisclosureProps = {}) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const onOpen = useCallback(async () => {
    try {
      await onOpenProp?.();
      setIsOpen(true);
    } catch (error) {
      logger(error);
    }
  }, [onOpenProp]);

  const onClose = useCallback(async () => {
    try {
      await onCloseProp?.();
      setIsOpen(false);
    } catch (error) {
      logger(error);
    }
  }, [onCloseProp]);

  const onToggle = useCallback(async () => {
    if (isOpen) {
      await onClose();
    } else {
      await onOpen();
    }
  }, [isOpen, onClose, onOpen]);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  } as const;
}
