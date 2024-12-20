import Cart from "../_components/cart";
import HeroSectionCarousel from "./_components/hero-section";
import ProductsSection from "./_components/products-section";
import ContactsSection from "./_components/contacts-section";
import BrandsSection from "./_components/brands-section";
import AboutUsSection from "./_components/about-us-section";
import Footer from "../_components/footer";
import CategorySection from "./_components/category-section";

const Home = async () => {
  return (
    <>
      <main className="bg-background pt-[72px]">
        <div className="fixed bottom-0 right-0 m-5 lg:m-10 z-20">
          <Cart />
        </div>

        {/* Hero Section */}
        <section className="pt-10 w-full h-fit relative">
          <div className="hidden lg:block absolute inset-y-0 left-0 w-80 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="hidden lg:block absolute inset-y-0 right-0 w-80 bg-gradient-to-l from-white to-transparent z-10" />
          <HeroSectionCarousel />
        </section>

        {/* Products Section */}
        <section className="flex h-fit flex-col items-center py-16 bg-white xl:bg-[url('/products.png')] bg-cover bg-no-repeat bg-center md:py-20">
          <ProductsSection />
        </section>

        <div className="flex w-full justify-center">
          <div className="w-[90%] h-[1px] bg-border" />
        </div>

        {/* Category Section */}
        <section className="flex h-fit flex-col items-center py-16 md:py-20 px-6 bg-white xl:bg-[url('/category.png')] bg-cover bg-no-repeat bg-center md:px-10">
          <CategorySection />
        </section>

        <div className="flex w-full justify-center">
          <div className="w-[90%] h-[1px] bg-border" />
        </div>

        {/* Brands Section */}
        <section className="flex h-fit flex-col items-center py-16 md:py-20 px-6 bg-white xl:bg-[url('/brand.png')] bg-cover bg-no-repeat bg-center md:px-10">
          <BrandsSection />
        </section>

        <div className="flex w-full justify-center">
          <div className="w-[90%] h-[1px] bg-border" />
        </div>

        {/* About Us Section */}
        <section className="flex h-fit flex-col items-center py-16 md:py-20 px-6 md:px-10">
          <AboutUsSection />
        </section>

        {/* Contacts Section */}
        <section className="flex h-fit flex-col bg-purple relative px-6 md:px-10 py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/paw-pattern.svg')] opacity-10 bg-repeat" style={{ backgroundSize: '300px 300px' }} />
          <div className="relative z-10">
            <ContactsSection />
          </div>
        </section>

        {/* Footer Section */}
        <Footer />
      </main>
    </>
  );
}

export default Home;