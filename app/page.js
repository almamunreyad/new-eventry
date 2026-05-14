import EventList from "@/components/landing/EventList";
import Header from "@/components/landing/Header";
// import Image from "next/image";

export default async function Home({ searchParams }) {
  // const query = await searchParams;
  const sp = await searchParams;
  const raw = sp?.query;
  const query = Array.isArray(raw) ? raw[0] : raw;

  return (
    <section className="container">
      <Header />
      <EventList query={query} />
    </section>
  );
}
