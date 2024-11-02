import { protectServer } from "@/features/auth/utils";

export default async function Home() {
  await protectServer();

  return <main>You are signed in.</main>;
}
