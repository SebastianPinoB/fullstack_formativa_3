import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router";
import Sidebar from "~/components/atoms/sideBar";

const { Sider, Content } = Layout;

export default function MainLayout() {
   return (
      <Layout style={{ minHeight: "100vh" }}>
         <Sider width={220} style={{ background: "transparent", height: "100vh", position: "sticky", top: 0 }}>
            <Sidebar />
         </Sider>

         <Layout>
            <Content style={{ padding: "1rem" }}>
               <Outlet />
            </Content>
         </Layout>
      </Layout>
   );
}