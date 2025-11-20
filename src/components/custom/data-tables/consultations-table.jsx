import MedicDetails from "@/components/drawers/medic-details";
import PatientDetails from "@/components/drawers/patient-details";
import RateModal from "@/components/modals/rate-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/contexts/AuthContextProvider";
import {
  acceptAppointment,
  cancelMyAppointmentPatient,
  getMyAppointments,
  getMyAppointmentsPersonnelSante,
  initiateConversation,
  refuseAppointmentPersonnelSante,
} from "@/lib/api";
import { message, Space, Table, Tag } from "antd";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ConsultationsTable = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const Navigate = useNavigate();

  const handleCancel = async (id) => {
    try {
      await cancelMyAppointmentPatient(id);

      const temp = appointments.map((appointment) => {
        if (appointment._id === id) {
          appointment.status = "Annulé";
        }
        return appointment;
      });

      setAppointments(temp);
      message.success("Consultation annulé avec succès.");
    } catch (error) {
      message.error(
        error ??
        "Une erreur s'est produite lors de l'annulation de votre consultation."
      );
    }
  };

  const handleApprove = async (id) => {
    try {
      await acceptAppointment(id);

      const temp = appointments.map((appointment) => {
        if (appointment._id === id) {
          appointment.status = "Accepté";
        }
        return appointment;
      });

      setAppointments(temp);
      message.success("Consultation approuvé avec succès 🎉");
    } catch (error) {
      message.error(
        error ??
        "Une erreur s'est produite lors de l'approbation de la consultation."
      );
    }
  };

  const handleReject = async (id) => {
    try {
      await refuseAppointmentPersonnelSante(id);

      const temp = appointments.map((appointment) => {
        if (appointment._id === id) {
          appointment.status = "Refusé";
        }
        return appointment;
      });

      setAppointments(temp);
      message.info("Consultation rejeté 💔");
    } catch (error) {
      message.error(
        error ??
        "Une erreur s'est produite lors de la rejet de la consultation."
      );
    }
  };

  const handleInitiateConversation = async (record) => {
    try {
      const _id = user?.role === "Patient" ? record?.personnelSante?._id : record?.patient?._id;
      const data = await initiateConversation(_id);

      Navigate("/discussions");
    } catch (error) {
      message.error(error);
    }
  };

  const columns = [
    {
      title: "Date de soumission",
      dataIndex: "createdAt",
      render: (text) => <>{dayjs(text).format("DD/MM/YYYY HH:mm")}</>,
    },
    {
      title: "Service",
      dataIndex: "serviceName",
      render: (text) => <p>{text ?? "N/A"}</p>,
    },
    {
      title: user?.role === "Patient" ? "Perso. Santé" : "Patient",
      render: (_, record) => (
        <p className="capitalize">
          {user?.role === "Patient"
            ? record?.personnelSante?.firstName +
            " " +
            record?.personnelSante?.lastName
            : record?.patient?.firstName + " " + record?.patient?.lastName}
        </p>
      ),
    },
    {
      title: "Date heure début",
      dataIndex: "startDate",
      render: (text) => <>{dayjs(text).format("DD/MM/YYYY HH:mm")}</>,
    },
    {
      title: "Statut",
      dataIndex: "status",
      render: (text) => (
        <Tag
          color={
            text === "En attente"
              ? "orange"
              : text === "Accepté"
                ? "green"
                : "default"
          }
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "Opérations",
      render: (_, record) => (
        <Space>
          {user?.role === "Patient" ? (
            <>
              <MedicDetails data={record?.personnelSante} />
              {record?.status === "En attente" ? (
                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={async () => await handleCancel(record?._id)}
                >
                  Annuler
                </Button>
              ) : record?.status === "Accepté" ? (
                <RateModal data={record?.personnelSante} id={record?._id} />
              ) : null}
            </>
          ) : (
            <>
              <PatientDetails data={record?.patient} />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button size="sm" variant="outline">
                    Traiter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    disabled={record?.status !== "En attente"}
                    onClick={async () => await handleApprove(record?._id)}
                  >
                    Accepter
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    disabled={record?.status !== "En attente"}
                    onClick={async () => await handleReject(record?._id)}
                  >
                    Refuser
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleInitiateConversation(record)}
          >
            Contacter
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    async function fetchData() {
      let data;
      if (user?.role === "Patient") {
        data = await getMyAppointments();
      } else {
        data = await getMyAppointmentsPersonnelSante();
      }

      setAppointments(data.appointments);
    }

    fetchData();
  }, []);
  return (
    <Table
      columns={columns}
      dataSource={appointments}
      scroll={{ x: "max-content" }}
    />
  );
};

export default ConsultationsTable;
