import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar'

interface Props {
  children: React.ReactNode;
}

const SharedLayout: React.FC<Props> = ({ children }: Props) => {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <NavBar />

      <div className=" h-24"></div>

      {children}

      <Footer />
    </section>
  )
}

export default SharedLayout;