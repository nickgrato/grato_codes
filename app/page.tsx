import Hero from '@Modules/sections/Hero/Hero';
export default function Home() {
  return (
    <section>
      <Hero
        title="Welcome"
        body="This is a place to show some of my work and interests. Take off your shoes, stay a while."
        ctaTitle="Message Me"
        ctaHref="/contact"
      />
    </section>
  );
}
