import React, { useState } from "react";
import { message, Modal, Rate } from "antd";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ratePersonnelSante } from "@/lib/api";

const RateModal = ({ data, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rate, setRate] = useState(0);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    try {
        const payload = {
            rating: rate,
            personnelSante: data?._id,
            appointmentId: id,
        }

        const response = await ratePersonnelSante(payload);
        message.success(response?.message + ' 🎉' ?? 'Merci pour votre notation 🎉')
        setIsModalOpen(false);
    } catch (error) {
        message.error(error ?? 'Une erreur s\'est produite lors de la notation du personnel de santé')
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button size="sm" onClick={showModal}>
        Noter
      </Button>
      <Modal
        okText="Noter"
        title={
          <p className="capitalize">{data?.firstName + " " + data?.lastName}</p>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex justify-center">
          <Rate
            allowHalf
            style={{ fontSize: "40px" }}
            onChange={(e) => setRate(e)}
          />
        </div>
      </Modal>
    </>
  );
};
export default RateModal;
