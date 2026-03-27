interface ContactMapProps {
  address: string;
}

const ContactMap = ({ address }: ContactMapProps) => {
  return (
    <div className="mt-12 aspect-[16/9] md:aspect-[21/9] border border-border overflow-hidden">
      <iframe
        title="Map"
        src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default ContactMap;