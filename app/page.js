import EventList from "@/components/landing/EventList";
import Header from "@/components/landing/Header";
import Loading from "@/components/Loading";
import { Suspense } from "react";

export default async function Home({ searchParams }) {
  // const query = await searchParams;
  const sp = await searchParams;
  const raw = sp?.query;
  const query = Array.isArray(raw) ? raw[0] : raw;

  return (
    <section className="container">
      <Header />

      <Suspense key={query} fallback={<Loading />}>
        <EventList query={query} />
      </Suspense>
    </section>
  );
}
