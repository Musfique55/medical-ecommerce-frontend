import CheckoutSteps from "@/components/modules/checkout/CheckoutSteps";
import { Footer } from "@/components/modules/layout/Footer";
import Header from "@/components/modules/layout/header/Header";

const CheckoutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <CheckoutSteps />
      {children}
      <Footer />
    </div>
  );
};

export default CheckoutLayout;
