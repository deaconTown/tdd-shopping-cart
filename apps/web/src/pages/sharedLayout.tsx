import NavBar from "@/components/NavBar"

export default function SharedLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <NavBar/>
   
        {children}
      </section>
    )
  }