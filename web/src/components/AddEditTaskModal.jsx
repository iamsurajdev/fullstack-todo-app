import { Button, Col, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";

const AddEditTaskModal = ({
  open,
  onCancel,
  editTaskData = null,
  addTask,
  updateTask,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editTaskData) {
      form.setFieldsValue({
        title: editTaskData?.title,
        description: editTaskData?.description,
        status: editTaskData?.status,
      });
    }
  }, [editTaskData]);

  return (
    <Modal
      title={`${editTaskData ? "Edit Task" : "Add Task"} Modal`}
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={editTaskData ? updateTask : addTask}>
        <Col
          style={{
            display: "inline-block",
            width: "97%",
            margin: "0 8px",
          }}
        >
          <p className="font-semibold text-[#37484B]">
            Title <span className="text-xl text-red-500">*</span>
          </p>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "Title is required",
              },
            ]}
          >
            <Input
              style={{
                height: 40,
              }}
              placeholder="Please provide Title"
            />
          </Form.Item>
        </Col>
        <Col
          style={{
            display: "inline-block",
            width: "97%",
            margin: "0 8px",
          }}
        >
          <p className="font-semibold text-[#37484B]">
            Description <span className="text-xl text-red-500">*</span>
          </p>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Description is required",
              },
            ]}
          >
            <Input
              style={{
                height: 40,
              }}
              placeholder="Please provide Description"
            />
          </Form.Item>
        </Col>
        <Col
          style={{
            display: "inline-block",
            width: "97%",
            margin: "0 8px",
          }}
        >
          <p className="font-semibold text-[#37484B]">
            Status <span className="text-xl text-red-500">*</span>
          </p>
          <Form.Item
            name="status"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              style={{
                height: 40,
              }}
              placeholder="Select a status"
              options={[
                {
                  value: "todo",
                  label: "To Do",
                },
                {
                  value: "inprogress",
                  label: "In Progress",
                },
                {
                  value: "done",
                  label: "Done",
                },
              ]}
            />
          </Form.Item>
        </Col>

        <Col
          style={{
            display: "inline-block",
            width: "97%",
            margin: "0 8px",
          }}
        >
          <Form.Item>
            <Button type="primary" block htmlType="submit">
              {editTaskData ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Col>
      </Form>
    </Modal>
  );
};

export default AddEditTaskModal;
