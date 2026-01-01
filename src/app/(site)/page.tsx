import { About } from '@/components/layouts/About';
import { Contact } from '@/components/layouts/Contact';
import { Top } from '@/components/layouts/Top';

export default function Home() {
  return (
    <div>
      <Top />
      <About />
      <Contact />
    </div>
  );
}
