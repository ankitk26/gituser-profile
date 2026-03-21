import { useState } from "react";
import UserInputForm from "@/components/user-input-form";
import UserInfo from "@/components/user-info";

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <>
      <UserInputForm onSearch={setUsername} />
      <UserInfo username={username} onClear={() => setUsername(null)} />
    </>
  );
}
