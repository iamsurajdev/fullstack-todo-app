import { Modal } from "antd";

const DeleteConformationModal = ({
  title,
  isOpen,
  onClose,
  content,
  onConform,
}) => {
  return (
    <Modal open={isOpen} onCancel={onClose} onOk={onConform} title={title}>
      <p>{content}</p>
    </Modal>
  );
};

export default DeleteConformationModal;