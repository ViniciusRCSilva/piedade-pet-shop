import Cart from "../_components/cart";
import HeroSectionCarousel from "./_components/hero-section";
import ProductsSection from "./_components/products-section";
import ContactsSection from "./_components/contacts-section";
import BrandsSection from "./_components/brands-section";
import AboutUsSection from "./_components/about-us-section";
import Footer from "../_components/footer";

const Home = async () => {
  return (
    <>
      <main className="pt-[72px]">
        <div className="fixed bottom-0 right-0 m-5 lg:m-10 z-10">
          <Cart />
        </div>

        {/* Hero Section */}
        <section className="w-full h-fit">
          <HeroSectionCarousel />
        </section>

        {/* Products Section */}
        <section className="flex h-fit flex-col items-center py-16 md:py-20 px-6 md:px-10">
          <ProductsSection />
        </section>

        <div className="flex w-full justify-center">
          <div className="w-[90%] h-[1px] bg-border" />
        </div>

        {/* Brands Section */}
        <section className="flex h-fit flex-col items-center py-16 md:py-20 px-6 md:px-10">
          <BrandsSection />
        </section>

        <div className="flex w-full justify-center">
          <div className="w-[90%] h-[1px] bg-border" />
        </div>

        {/* About Us Section */}
        <section className="flex h-fit w-full items-center justify-center py-16 md:py-20 px-6 md:px-10">
          <AboutUsSection />
        </section>

        {/* Contacts Section */}
        <section className="flex h-fit flex-col bg-contacts_section bg-cover bg-no-repeat px-6 md:px-10 py-16 md:py-20">
          <ContactsSection />
        </section>

        {/* Footer Section */}
        <Footer />
      </main>
    </>
  );
}

export default Home;