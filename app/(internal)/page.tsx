import Hero from '@Modules/sections/Hero/Hero';
import BlogSection from '@Modules/blog/BlogSection/BlogSection';
export default function Home() {
  return (
    <section>
      <Hero
        title="Glad You're Here"
        body="This is a place to show some of my work and interests. Take off your shoes, stay a while."
        ctaTitle="Message Me"
        ctaHref="/contact"
      />

      {/* BLOG PREVIEWS  */}
      <section>
        <BlogSection />
      </section>
    </section>
  );
}
