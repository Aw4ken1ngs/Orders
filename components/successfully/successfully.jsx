import React, { useMemo } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { CorrectIcon } from "@/images/icon/correct-icon";


export default function Successfully({ isOpen, onOpenChange, status }) {
  const title = useMemo(() => {
    if (status === 'create') {
      return 'Заказ успешно создан!'
    }
    if (status === 'update') {
      return 'Заказ успешно обновлен!'
    } if (status === 'removed') {
      return 'Заказ успешно удален!'
    }
    return ''
  }, [status])
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="justify-center items-center">
                <div> {title}</div>
              </ModalHeader>
              <ModalBody className="justify-center items-center py-0">
                <CorrectIcon />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Закрыть
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
