import { Typography, Flex, Form, Input, Button, Card, Divider, Tag } from "antd";
import React, { useState } from "react";

const { Title } = Typography;

// Datos de ejemplo para simular la respuesta del backend
const mockData = {
   // Ejemplo de un estado encontrado
   found: {
      code: "ENV123456",
      status: "EN TRÁNSITO",
      origin: "Santiago 28001",
      destination: "Valparaíso 19000",
      lastUpdate: "20 Nov, 2025 - 14:00",
      estimatedDelivery: "23 Nov, 2025",
   },
   // Ejemplo de un estado no encontrado
   notFound: null,
};

export default function MisEnvios() {
   const [form] = Form.useForm();
   const [trackingResult, setTrackingResult] = useState(null);
   const [isSearching, setIsSearching] = useState(false);
   // Nuevo estado para guardar el código buscado y mostrarlo en el error
   const [searchedCode, setSearchedCode] = useState('');

   const onFinish = (values) => {
      setIsSearching(true);
      setTrackingResult(null); // Limpiar resultado anterior
      setSearchedCode(values.trackingCode); // Guardar el código que se está buscando

      // 1. Simular la llamada al Backend con un delay
      setTimeout(() => {
         setIsSearching(false);

         // 2. Lógica de simulación: si el código es "ENV123456", se encuentra; sino, no.
         if (values.trackingCode === "ENV123456") {
            setTrackingResult(mockData.found);
         } else {
            // Si no se encuentra, el trackingResult sigue siendo null, lo que activa el mensaje de error.
            setTrackingResult(mockData.notFound);
         }
      }, 1500); // Esperar 1.5 segundos para simular carga
   };

   // Funciones auxiliares (mantienen su funcionalidad)
   const getStatusColor = (status) => {
      switch (status) {
         case 'REGISTRADO': return 'default';
         case 'EN TRÁNSITO': return 'processing';
         case 'EN REPARTO': return 'warning';
         case 'ENTREGADO': return 'success';
         default: return 'error';
      }
   };

   const DetailRow = ({ label, value }) => (
      <Flex justify="space-between" style={{ padding: '8px 0' }}>
         <Typography.Text strong>{label}:</Typography.Text>
         <Typography.Text>{value}</Typography.Text>
      </Flex>
   );

   return (
      <Flex vertical align="center" style={{ width: '100%', padding: '40px 0' }}>

         {/* Encabezado (código omitido por brevedad, no se ha cambiado) */}
         <Title level={2} style={{ marginBottom: '8px', textAlign: 'center' }}>
            Rastrea tu envío en tiempo real
         </Title>
         <p style={{ marginBottom: '32px', textAlign: 'center', maxWidth: '600px' }}>
            Ingresa el código de seguimiento que recibiste para ver el estado de tu encomienda
         </p>

         {/* Formulario de Búsqueda (código omitido por brevedad, no se ha cambiado) */}
         <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            style={{ width: '100%', maxWidth: '450px' }}
         >
            <Flex gap={12} style={{ width: '100%' }}>
               <Form.Item
                  name="trackingCode"
                  label="Código de seguimiento"
                  style={{ flex: 1, marginBottom: 0 }}
                  rules={[{ required: true, message: 'Por favor, ingresa el código de seguimiento' }]}
               >
                  <Input
                     placeholder="Ingresa tu código de seguimiento (Ej: ENV123456)"
                     size="large"
                  />
               </Form.Item>

               <Form.Item style={{ marginBottom: 0, marginTop: '30px' }}>
                  <Button
                     type="primary"
                     size="large"
                     htmlType="submit"
                     loading={isSearching}
                  >
                     {isSearching ? 'Buscando...' : 'Buscar'}
                  </Button>
               </Form.Item>
            </Flex>
         </Form>

         {/* ⬅️ AÑADIDO: CONTENEDOR DE RESULTADOS */}

         {/* 1. Muestra el estado del envío si se encontró */}
         {trackingResult && (
            <Card
               title="Estado de la encomienda"
               style={{ width: '100%', maxWidth: '600px', marginTop: '40px' }}
               headStyle={{ borderBottom: 'none' }}
            >
               <Flex vertical gap={8}>
                  {/* ... Detalles del Card (igual que antes) ... */}
                  <DetailRow label="Código de Seguimiento" value={trackingResult.code} />
                  <Flex justify="space-between" align="center" style={{ padding: '8px 0' }}>
                     <Typography.Text strong>Estado Actual:</Typography.Text>
                     <Tag color={getStatusColor(trackingResult.status)} style={{ padding: '4px 12px', fontSize: '14px' }}>
                        {trackingResult.status}
                     </Tag>
                  </Flex>

                  <Divider style={{ margin: '16px 0' }} />

                  <DetailRow label="Origen" value={trackingResult.origin} />
                  <DetailRow label="Destino" value={trackingResult.destination} />
                  <DetailRow label="Última Actualización" value={trackingResult.lastUpdate} />
                  <DetailRow label="Entrega Estimada" value={trackingResult.estimatedDelivery} />
               </Flex>
            </Card>
         )}

         {/* 2. Muestra el mensaje de no encontrado si se completó la búsqueda y no hubo resultado */}
         {!trackingResult && !isSearching && searchedCode && (
            <Card
               style={{ width: '100%', maxWidth: '600px', marginTop: '40px' }}
               type="inner" // Un tipo de tarjeta más simple para un error
            >
               <p style={{ textAlign: 'center', color: '#f5222d', fontWeight: 'bold' }}>
                  ❌ No se encontró ningún envío con el código: **{searchedCode}**.
               </p>
               <p style={{ textAlign: 'center' }}>
                  Por favor, verifica el código e intenta de nuevo.
               </p>
            </Card>
         )}
      </Flex>
   );
}