import Headers2 from '@/components/atoms/headers2';
import { Mail, MapPin, Phone } from 'lucide-react';

const ContactModules = () => {
  return (
    <section>
      <div className="pb-32 pt-10">
        <div className="container">
          <Headers2
            title='Reach Us'
            subtitle='Speak with Our Friendly Team'
            description="We'd love to assist you. Fill out the form or drop us an email."
          />
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <span className="mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-accent">
                <Mail className="h-6 w-auto" />
              </span>
              <p className="mb-2 text-lg font-semibold">Email Us</p>
              <p className="mb-3 text-muted-foreground">Our team is ready to assist.</p>
              <a href="#" className="font-semibold hover:underline">
                abc@example.com
              </a>
            </div>
            <div>
              <span className="mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-accent">
                <MapPin className="h-6 w-auto" />
              </span>
              <p className="mb-2 text-lg font-semibold">Visit Us</p>
              <p className="mb-3 text-muted-foreground">Drop by our office for a chat.</p>
              <a href="#" className="font-semibold hover:underline">
                1234 Street Name, City Name
              </a>
            </div>
            <div>
              <span className="mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-accent">
                <Phone className="h-6 w-auto" />
              </span>
              <p className="mb-2 text-lg font-semibold"> Call Us</p>
              <p className="mb-3 text-muted-foreground">We&apos;re available Mon-Fri, 9am-5pm.</p>
              <a href="#" className="font-semibold hover:underline">
                +123 456 7890
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactModules;
