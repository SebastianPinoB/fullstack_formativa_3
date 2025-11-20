import {
  Typography,
  Flex,
  Form,
  Input,
  Button,
  Card,
  Alert,
  Select,
  Divider,
  message,
} from "antd";
import React, { useState } from "react";

const { Title } = Typography;
const { Option } = Select;

// ➡️ Simulación de la respuesta de una API
const simulatedTrackingData = {
  ENV123456: {
    status: "En tránsito",
    details: "El paquete ha salido del centro de distribución.",
  },
  ENV789012: {
    status: "Entregado",
    details: "El paquete fue entregado satisfactoriamente.",
  },
};

export default function Actualizar() {
  const [trackingFound, setTrackingFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  // Función que se ejecuta al enviar el formulario de búsqueda
  const onSearchFinish = (values) => {
    if (simulatedTrackingData[values.trackingCode]) {
      setTrackingFound(true);
      updateForm.resetFields();
    } else {
      setTrackingFound(false);
      message.error(
        `Código ${values.trackingCode} no encontrado. Intenta con ENV123456.`
      );
    }
  };

  // Función que se ejecuta al enviar el formulario de actualización de estado
  const onUpdateFinish = async (values) => {
    setLoading(true);

    try {
      // 💡 Esta sección solo se ejecuta si la validación de campos es correcta
      
      // Simulación de una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1500)); 

      // 1. Mostrar Feedback de Éxito con el mensaje solicitado ⬅️ MENSAJE AQUÍ
      message.success(
        `✅ El estado del paquete ${searchForm.getFieldValue(
          "trackingCode"
        )} se editó correctamente a: ${values.newStatus}`
      );

      // 2. Ocultar la sección de actualización para evitar el reenvío
      setTrackingFound(false);

      console.log("Actualización exitosa:", values);
    } catch (error) {
      // Mostrar Feedback de Error
      message.error("Hubo un error al intentar actualizar el estado.");
      console.error("Error al actualizar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card bodyStyle={{ padding: "32px" }}>
      <Form
        form={searchForm}
        layout="vertical"
        onFinish={onSearchFinish}
      >
        <Flex vertical align="center" style={{ width: "100%" }}>
          <Title level={2} style={{ marginBottom: "8px" }}>
            Rastrea tu envío en tiempo real
          </Title>
          <p style={{ marginBottom: "32px", textAlign: "center" }}>
            Ingresa el código de seguimiento que recibiste para ver el estado de
            tu encomienda
          </p>

          <Flex gap={12} style={{ width: "100%", maxWidth: "450px" }}>
            {/* Input y su Label */}
            <Form.Item
              name="trackingCode"
              label="Código de seguimiento"
              style={{ flex: 1, marginBottom: 0 }}
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa el código de seguimiento",
                },
              ]}
            >
              <Input
                placeholder="Ingresa tu código de seguimiento (Ej: ENV123456)"
                size="large"
              />
            </Form.Item>

            {/* Botón de Búsqueda */}
            <Form.Item
              style={{ marginBottom: 0, marginTop: "30px" }}
            >
              <Button type="primary" size="large" htmlType="submit">
                Buscar
              </Button>
            </Form.Item>
          </Flex>
        </Flex>
      </Form>

      {/* ----------------------------------------------------- */}
      {trackingFound && <Divider />}
      {/* ----------------------------------------------------- */}

      {/* 🔍 APARTADO DE ACTUALIZACIÓN VISIBLE SÓLO SI SE ENCUENTRA EL CÓDIGO */}
      {trackingFound && (
        <div style={{ marginTop: "32px" }}>
          <Title level={3} style={{ marginBottom: "24px", textAlign: "center" }}>
            Actualizar Estado 📝
          </Title>

          <Alert
            message={`Código ${searchForm.getFieldValue(
              "trackingCode"
            )} encontrado. Por favor, actualiza el estado.`}
            type="info"
            showIcon
            style={{ marginBottom: "24px" }}
          />

          {/* Formulario de Actualización de Estado */}
          <Form
            form={updateForm}
            layout="vertical"
            onFinish={onUpdateFinish}
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            <Form.Item
              name="newStatus"
              label="Nuevo Estado"
              rules={[
                {
                  required: true,
                  message: "Selecciona el nuevo estado del envío",
                },
              ]}
            >
              <Select placeholder="Selecciona el estado">
                <Option value="En tránsito">En tránsito</Option>
                <Option value="En almacén local">En almacén local</Option>
                <Option value="En reparto">En reparto</Option>
                <Option value="Entregado">Entregado</Option>
                <Option value="Excepción">Excepción</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="updateDetails"
              label="Detalles de la Actualización"
              rules={[
                {
                  required: true,
                  message: "Ingresa detalles relevantes para esta actualización",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Ej: Paquete cargado en vehículo de reparto, Salió de la aduana, etc."
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
                disabled={loading}
              >
                {loading ? "Actualizando..." : "Actualizar"} 
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </Card>
  );
}