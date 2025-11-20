import React, { useState } from "react";

import {
  DatePicker,
  Divider,
  Flex,
  Form,
  message,
  Rate,
  Slider,
  Space,
  Table,
  Typography,
} from "antd";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { SearchOutlined } from "@ant-design/icons";
import { persoSanteValues } from "@/lib/constants";
import dayjs from "dayjs";
import { createAppointment, getProximity } from "@/lib/api";
import MedicDetails from "@/components/drawers/medic-details";

function NewRequestPage() {
  const [form] = Form.useForm();
  const [services, setServices] = React.useState(null);
  const [selectedService, setSelectedService] = React.useState(null);
  const [selectedRole, setSelectedRole] = React.useState(null);
  const [healthPersonnels, setHealthPersonnels] = React.useState(null);
  const [genre, setGenre] = useState("");
  const [distance, setDistance] = useState(10);

  const [requestData, setRequestData] = useState({});

  const handleChangeRole = (e) => {
    const serviceTemp = persoSanteValues.find((role) => role.value === e);

    setServices(serviceTemp.services);
    setSelectedRole(e);
    if (e === "Medecin") {
      setSelectedService("Medecin generaliste");
    } else if (e === "Sage femme") {
      setGenre("F");
    } else {
      setSelectedService(null);
    }
    setHealthPersonnels(false);
  };

  const handleChangeService = (e) => {
    setSelectedService(e);
  };

  const handleSearch = async (formValues) => {
    try {
      const payload = {
        startDate: dayjs(formValues.startDate).format("YYYY-MM-DDTHH:mm:ssZ"),
        endDate: dayjs(formValues.startDate).add(1, 'hour').format("YYYY-MM-DDTHH:mm:ssZ"),
        role: selectedRole,
        serviceName: selectedService,
        service: selectedService,
        genre: genre,
        distance: distance * 1000,
      };

      const data = await getProximity(payload);

      setRequestData(payload);
      setHealthPersonnels(data?.personnelSante);

      setTimeout(() => {
        const element = document.getElementById("search-result");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } catch (error) {
      console.log(error);
      message.error(
        error ?? "Quelque chose c'est mal passé. Merci d'essayer plus tard"
      );
    }
  };

  const handleRequest = async (id) => {
    try {
      const { data } = await createAppointment({
        ...requestData,
        personnelSante: id,
      });

      message.success("Demande de consultation envoyée avec succès");
      setServices(null);
      setSelectedRole(null);
      setSelectedService(null);
      setHealthPersonnels(null);
    } catch (error) {
      message.error(
        error ?? "Quelque chose c'est mal passé. Merci d'essayer plus tard"
      );
    }
  };

  const columns = [
    {
      title: "Nom",
      dataIndex: "firstName",
      render: (text) => <p className="capitalize">{text}</p>,
    },
    {
      title: "Prénom",
      dataIndex: "lastName",
      render: (text) => <p className="capitalize">{text}</p>,
    },
    {
      title: "Adresse",
      dataIndex: "adresse",
    },
    {
      title: "Contacts",
      render: (_, record) => (
        <Flex vertical>
          <div>Email: {record?.email}</div>
          <div>Télèphone: {record?.numTel}</div>
        </Flex>
      ),
    },
    {
      title: "Notation",
      render: (_, record) => (
        <Rate disabled allowHalf defaultValue={record?.ratingAverage} />
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <Button
            size="sm"
            onClick={async () => await handleRequest(record?._id)}
          >
            Demander
          </Button>
          <MedicDetails data={record} />
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Typography.Title level={3}>
        Nouvelle demande de consultation 📝
      </Typography.Title>
      <Typography.Text>Choisissez l'une personnelles santés:</Typography.Text>
      <RadioGroup
        className="mt-3 grid sm:w-full lg:w-[600px] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
        onValueChange={handleChangeRole}
      >
        {persoSanteValues.map((role) => {
          return (
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={role.value} id={role.value} />
              <Label htmlFor={role.value}>{role.label}</Label>
            </div>
          );
        })}
      </RadioGroup>
      <div className="mt-5">
        <Typography.Text>Choisissez le genre:</Typography.Text>
        <RadioGroup
          disabled={selectedRole === "Sage femme"}
          onValueChange={(e) => setGenre(e)}
          value={genre}
          className="mt-3 grid sm:w-full lg:w-[600px] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={"H"} id={"homme"} />
            <Label htmlFor={"homme"}>Homme</Label>
            <RadioGroupItem value={"F"} id={"Femme"} />
            <Label htmlFor={"Femme"}>Femme</Label>
            <RadioGroupItem value={""} id={"N/A"} />
            <Label htmlFor={"N/A"}>N/A</Label>
          </div>
        </RadioGroup>
      </div>
      {services && (
        <div className="mt-5">
          <Typography.Text>Choisissez un service: </Typography.Text>
          <RadioGroup
            className="mt-3 grid sm:w-full  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
            onValueChange={handleChangeService}
          >
            {services.map((service) => {
              return (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={service.serviceName}
                    id={service._id.$oid}
                  />
                  <Label htmlFor={service._id.$oid}>
                    {service.serviceName}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      )}
      {selectedService && (
        <div className="mt-3">
          <Divider />
          <Typography.Text>
            Remplir le formulaire pour la demande de consultation pour{" "}
            <span className="font-bold">{selectedService}</span>:
          </Typography.Text>
          <Form
            layout="vertical"
            form={form}
            className="p-3 mt-3"
            onFinish={handleSearch}
          >
            <Form.Item
              name="startDate"
              label="Date et heure début"
              rules={[
                {
                  required: true,
                  message: "Date et heure début est obligatoire",
                },
              ]}
            >
              <DatePicker
                showTime={{
                  defaultValue: dayjs("08:00", "HH:mm"),
                  format: "HH:mm",
                  disabledHours: () => {
                    if (selectedRole === "Medecin") {
                      return Array.from({ length: 24 }, (_, i) => i).filter(
                        (hour) => hour < 8 || hour > 17
                      );
                    }
                    return [];
                  },
                  disabledMinutes: (selectedHour) => {
                    if (selectedRole === "Medecin") {
                      if (selectedHour === 8) {
                        return Array.from({ length: 60 }, (_, i) => i).filter(
                          (minute) => minute < 0 || minute > 45
                        );
                      } else if (selectedHour === 17) {
                        return Array.from({ length: 60 }, (_, i) => i).filter(
                          (minute) => minute > 0 || minute < 45
                        );
                      }
                    }
                    return [];
                  },
                }}
                disabledDate={(current) =>
                  current && current < dayjs().startOf("day")
                }
              />
            </Form.Item>
            <Button type="submit" size={"sm"} className="flex gap-1">
              <SearchOutlined /> Rechercher à proximité
            </Button>
          </Form>
        </div>
      )}

      <div id="search-result">
        <Divider />

        <div className="mx-auto sm:w-full md:w-[400px] lg:w-[600]">
          <Label>
            Distance maximum en <span className="font-bold">kilométre</span>:
          </Label>
          <Slider
            value={distance}
            onChange={(e) => setDistance(e)}
            min={1}
            max={30}
          />
        </div>
        {healthPersonnels && (
          <>
            <Typography.Title level={4}>
              Personnelles de santé à proximité
            </Typography.Title>
            <Table columns={columns} dataSource={healthPersonnels} />
          </>
        )}
      </div>
    </div>
  );
}

function RequestListPage() {
  return <div>Request List Page</div>;
}

function RequestDetailPage() {
  return <div>Request Detail Page</div>;
}

export { NewRequestPage, RequestListPage, RequestDetailPage };
