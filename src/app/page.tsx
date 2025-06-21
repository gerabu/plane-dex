import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-base-200 text-primary">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 bg-base-100">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] text-base-content">
            Hello {session?.user.name}
          </h1>
        </div>
      </main>
    </HydrateClient>
  );
}
