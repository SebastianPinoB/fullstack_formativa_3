import { Card, Typography, Flex, Form, Input, Button, Result, message } from "antd";
import React, { useState } from "react";

const { Title } = Typography;

// 🎨 Estilo para los bloques internos de cada sección
const sectionStyle = {
    padding: '24px',
    backgroundColor: '#fafafa',
    borderRadius: '6px',
    border: '1px solid #f0f0f0',
};

export default function Formulario() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [trackingCode, setTrackingCode] = useState(''); // Estado para el código de seguimiento
    const [form] = Form.useForm(); 

    const columnGap = 48;

    // --- Funciones de Manejo ---

    // Genera un código de seguimiento simple (Ejemplo)
    const generateTrackingCode = () => {
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        return `ENV${randomNum}`;
    };

    const onFinish = (values) => {
        console.log('Valores recibidos:', values);
        
        const newTrackingCode = generateTrackingCode();
        setTrackingCode(newTrackingCode);
        setIsSubmitted(true);
    };

    const handleCopyCode = () => {
        if (trackingCode) {
            navigator.clipboard.writeText(trackingCode);
            message.success(`Código ${trackingCode} copiado al portapapeles.`);
        }
    };

    const handleNewShipment = () => {
        setIsSubmitted(false); // Oculta la vista de éxito
        setTrackingCode(''); // Vacía el código
        form.resetFields();  // Vacia todos los campos del formulario
    };

    // --- Componente ---

    return (
        <Form 
            layout="vertical" 
            form={form}
            onFinish={onFinish}
        >
            <Card bodyStyle={{ padding: '32px' }}>

                <Title level={2}>
                    Registrar nueva encomienda
                </Title>
                <p style={{ marginBottom: '50px' }}>Completa los detalles a continuacion para generar tu envío</p>

                <Flex gap={columnGap} align="flex-start">

                    {/* Columna izquierda (Campos de Formulario) */}
                    <Flex vertical style={{ flex: '3' }} gap={24}>

                        {/* APARTADO 1: Información de Origen y Destino */}
                        <div style={sectionStyle}>
                            <Title level={3} style={{ marginTop: 0, marginBottom: '16px' }}>
                                Información de Origen y Destino
                            </Title>
                            <Flex gap={24}>
                                <Form.Item
                                    label="Origen (Ciudad, Código Postal)"
                                    name="origen"
                                    rules={[{ required: true, message: '¡Campo requerido!' }]}
                                    style={{ flex: 1 }}
                                >
                                    <Input placeholder="Ej: Santiago 28001" />
                                </Form.Item>
                                <Form.Item
                                    label="Destino (Ciudad, Código Postal)"
                                    name="destino"
                                    rules={[{ required: true, message: '¡Campo requerido!' }]}
                                    style={{ flex: 1 }}
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
                            <Flex gap={24}>
                                <Form.Item
                                    label="Peso (kg)"
                                    name="peso"
                                    rules={[{ required: true, message: '¡Campo requerido!' }]}
                                    style={{ flex: 1 }}
                                >
                                    <Input placeholder="Ej: 2.5" type="number" />
                                </Form.Item>
                                <Form.Item
                                    label="Tipo de paquete"
                                    name="tipo"
                                    rules={[{ required: true, message: '¡Campo requerido!' }]}
                                    style={{ flex: 1 }}
                                >
                                    <Input placeholder="Ej: Caja" />
                                </Form.Item>
                                <Form.Item style={{ flex: 1 }}></Form.Item>
                            </Flex>
                            <Flex gap={24}>
                                <Form.Item
                                    label="Largo (cm)"
                                    name="largo"
                                    rules={[{ required: true, message: '¡Campo requerido!' }]}
                                    style={{ flex: 1 }}
                                >
                                    <Input placeholder="30" type="number" />
                                </Form.Item>
                                <Form.Item
                                    label="Ancho (cm)"
                                    name="ancho"
                                    rules={[{ required: true, message: '¡Campo requerido!' }]}
                                    style={{ flex: 1 }}
                                >
                                    <Input placeholder="20" type="number" />
                                </Form.Item>
                                <Form.Item
                                    label="Alto (cm)"
                                    name="alto"
                                    rules={[{ required: true, message: '¡Campo requerido!' }]}
                                    style={{ flex: 1 }}
                                >
                                    <Input placeholder="10" type="number" />
                                </Form.Item>
                            </Flex>
                        </div>

                        {/* Botón de Envío */}
                        <Form.Item style={{ marginTop: '24px' }}>
                            <Button 
                                type="primary" 
                                htmlType="submit"
                                size="large"
                                style={{ width: '100%' }}
                                disabled={isSubmitted} // Deshabilitar si ya se envió
                            >
                                Registrar Envío
                            </Button>
                        </Form.Item>

                    </Flex>

                    {/* Separador Vertical */}
                    <div style={{
                        width: '1px',
                        backgroundColor: '#e0e0e0',
                        alignSelf: 'stretch',
                        minHeight: '350px'
                    }} />

                    {/* Columna Derecha: Código / Confirmación */}
                    <Flex vertical style={{ flex: '1', minWidth: '250px' }}>

                        {/* APARTADO 3: Renderizado Condicional */}
                        <div style={sectionStyle}>
                            {isSubmitted ? (
                                <Result
                                    status="success"
                                    title="¡Envío registrado con éxito!"
                                    subTitle={
                                        <div>
                                            Su código de seguimiento es:
                                            <Title level={4} style={{ margin: '8px 0', color: '#1890ff' }}>
                                                {trackingCode}
                                            </Title>
                                        </div>
                                    }
                                    extra={
                                        <Flex vertical gap={10}>
                                            <Button 
                                                type="primary" 
                                                onClick={handleCopyCode} // Botón para copiar el código
                                                block
                                            >
                                                Copiar Código
                                            </Button>
                                            <Button 
                                                onClick={handleNewShipment} // Botón para resetear el formulario
                                                block
                                            >
                                                Registrar Nuevo Envío
                                            </Button>
                                        </Flex>
                                    }
                                />
                            ) : (
                                <>
                                    <Title level={3} style={{ marginTop: 0, marginBottom: '16px' }}>
                                        Código del Paquete
                                    </Title>
                                    <p>Una vez hayas completado y enviado el formulario correctamente el codigo de seguimiento aparecera aquí</p>
                                </>
                            )}
                        </div>
                    </Flex>
                </Flex>
            </Card>
        </Form>
    );
}