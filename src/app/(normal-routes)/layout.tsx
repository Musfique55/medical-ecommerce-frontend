import { Footer } from "@/components/modules/layout/Footer";
import Header from "@/components/modules/layout/header/Header";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return <div>
        <Header />
        {children}
        <Footer />
    </div>
};


export default CommonLayout;