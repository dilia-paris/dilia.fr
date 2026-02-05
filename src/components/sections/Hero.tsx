interface HeroProps {
  title: string;
  subtitle?: string;
}

const Hero = ({ title, subtitle }: HeroProps) => {
  return (
    <section className="py-24 md:py-32 lg:py-40 border-b border-border">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl tracking-wide opacity-70">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default Hero;
