interface HeroProps {
  title: string;
  subtitle?: string;
}

const Hero = ({ title, subtitle }: HeroProps) => {
  return (
    <section className="py-10 md:py-12 lg:py-16 border-b border-border">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-3">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg tracking-wide opacity-70">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default Hero;
