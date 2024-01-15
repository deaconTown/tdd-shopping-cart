import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar'

interface Props {
  children: React.ReactNode;
}

const SharedLayout: React.FC<Props> = ({ children }: Props) => {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className='z-0'>
        <NavBar />
      </div>

      <div className=" h-36"></div>

      {children}

      <Footer />
    </section>
  )
}

export default SharedLayout;