import EventDetails from "@/components/details/EventDetails";
import EventVenue from "@/components/details/EventVenue";
import HeroSection from "@/components/details/HeroSection";
import { getEventById } from "@/db/queries";


export async function generateMetadata({ params }) {
  const { id } = await params
  const eventInfo = await getEventById(id);
  console.log(eventInfo);

  return {
    title: `Eventry - ${eventInfo?.name}`,
    description: eventInfo?.details,
    openGraph: {
      // title: `Eventry - ${eventInfo?.name}`,
      // description: eventInfo?.details,
      images: [eventInfo?.imageUrl],
    },
  }
}



const EventDetailsPage = async ({ params }) => {
  const { id } = await params;

  const eventInfo = await getEventById(id);
  console.log(eventInfo);

  return (
    <>
      <HeroSection eventInfo={eventInfo} />

      <section className="container">
        <div className="grid grid-cols-5 gap-12 my-12">
          <EventDetails details={eventInfo?.details} swags={eventInfo?.swags} />

          <EventVenue location={eventInfo?.location} />
        </div>
      </section>
    </>
  );
};

export default EventDetailsPage;
