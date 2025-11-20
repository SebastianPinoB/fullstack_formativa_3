import { Card, Typography, Divider, Flex, Form, Input, Button } from "antd";
import React from "react";

const { Title } = Typography;

// 🎨 Estilo para los bloques internos de cada sección
const sectionStyle = {
   padding: '24px',
   backgroundColor: '#fafafa', // Fondo gris muy claro para destacar el bloque
   borderRadius: '6px', // Esquinas redondeadas sutiles
   border: '1px solid #f0f0f0', // Borde muy claro
   // Margin (espacio) se gestiona mejor con "gap" en el <Flex> padre
};

export default function Formulario() {
   const columnGap = 48; // Espacio entre las dos columnas

   return (
      <Form layout="vertical">
         <Card bodyStyle={{ padding: '32px' }}>

            <Title level={2}>
               Registrar nueva encomienda
            </Title>
            <p style={{ marginBottom: '50px' }}>Completa los detalles a continuacion para generar tu envío</p>

            <Flex gap={columnGap} align="flex-start">

               {/* Columna izquierda */}
               <Flex vertical style={{ flex: '3' }} gap={24}>

                  {/* APARTADO 1: Información de Origen y Destino */}


                  <div style={sectionStyle}>
                     <Title level={3} style={{ marginTop: 0, marginBottom: '16px' }}>
                        Información de Origen y Destino
                     </Title>

                     <Flex gap={24}>
                        <Form.Item
                           label="Origen (Ciudad, Código Postal)"
                           style={{ flex: 1, minWidth: '50%' }} 
                        >
                           <Input placeholder="Ej: Santiago 28001" />
                        </Form.Item>

                        {/* Destino */}
                        <Form.Item
                           label="Destino (Ciudad, Código Postal)"
                           style={{ flex: 1, minWidth: '50%' }}
                        >
                           <Input placeholder="Ej: Valparaíso 19000" />
                        </Form.Item>

                     </Flex>
                  </div>

                  {/* APARTADO 2: Detalles del Paquete */}
                  <div style={sectionStyle}>
                     <Title level={3} style={{ marginTop: 0, marginBottom: '16px' }}>
                        Detalles del Paquete
                     </Title>
                     
                     <Flex>
                        <Form.Item
                           label="Peso (kg)"
                           style={{ flex: 1, minWidth: '33%', marginRight: 16 }}
                        >
                           <Input placeholder="Ej: 2.5" />
                        </Form.Item>
                        <Form.Item
                           label="Tipo de paquete"
                           style={{ flex: 1, minWidth: '33%', marginRight: 16 }}
                        >
                           <Input placeholder="Ej: Caja" />
                        </Form.Item>
                     </Flex>
                     <Flex>
                        <Form.Item
                           label="Largo (cm)"
                           style={{ flex: 1, minWidth: '33%', marginRight: 16 }}
                        >
                           <Input placeholder="30" />
                        </Form.Item>
                        <Form.Item 
                           label="Ancho (cm)"
                           style={{ flex: 1, minWidth: '33%', marginRight: 16 }}
                        >
                           <Input placeholder="20" />
                        </Form.Item>
                        <Form.Item
                           label="Alto (cm)"
                           style={{ flex: 1, minWidth: '33%' }}
                        >
                           <Input placeholder="10" />
                        </Form.Item>
                     </Flex>

                  </div>

               </Flex>



               {/* Columna Derecha: 🏷️ Código del Paquete (Contenedor único) */}
               <Flex vertical style={{ flex: '1', minWidth: '250px' }}>

                  {/* APARTADO 3: Código del Paquete */}
                  <div style={sectionStyle}>
                     <Title level={3} style={{ marginTop: 0, marginBottom: '16px' }}>
                        Código del Paquete
                     </Title>
                     <p>Referencia o código de seguimiento único.</p>
                     {/* Aquí irán los Form.Item */}
                  </div>

               </Flex>

            </Flex>
         </Card>
      </Form>
   );
}