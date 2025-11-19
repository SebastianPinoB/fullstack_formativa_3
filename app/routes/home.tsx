import MisEnvios from "~/components/organisms/misEnvios";
import MainLayout from "~/components/layouts/mainLayout";


export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <MisEnvios />;
}
