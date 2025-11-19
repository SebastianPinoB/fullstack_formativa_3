import React from "react";
import { Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function NavBarLinks() {
   const navigate = useNavigate();


   return (
      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
         <div style={{ padding: "1rem 1rem 0 1rem" }}>
               <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Avatar size={40} icon={<UserOutlined />} />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                     <span style={{ fontWeight: 600 }}>Nombre de usuario</span>
                  </div>
               </div>
            </div>
         <div style={{ flex: 1, overflow: "auto", padding: "0 0 1rem 0", marginTop: 12 }}>
            <Menu
               mode="inline"
               items={[
                  { key: "/crearEnvio", label: "Crear Envio", onClick: () => navigate("/crearEnvio") },
                  { key: "/misEnvios", label: "Mis envios", onClick: () => navigate("/misEnvios")  },
                  { key: "/configuracion", label: "Configuracion", onClick: () => navigate("/configuracion") },
               ]}
               style={{ height: "100%", borderRight: 0 }}
            />
         </div>
      </div>
   )
}