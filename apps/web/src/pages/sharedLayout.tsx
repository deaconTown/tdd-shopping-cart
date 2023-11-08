import NavBar from '@/components/NavBar'
import { ShoppingCartProvider } from '@/context/ShoppingCartContext'
const SharedLayout = ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) =>{
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <NavBar />

      <div className=" h-24"></div>

      {children}

    </section>
  )
}

export default SharedLayout;