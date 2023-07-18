import { Button, LinkButton } from "@/components/Button/Button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p>Hello.</p>
        <div className="mt-4">
          <LinkButton href={"/create"}>Create Connection</LinkButton>
        </div>
      </div>
    </main>
  );
}
