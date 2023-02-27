import Featured from "../../components/markets/featured/Featured";
import FeaturedProperties from "../../components/markets/featuredProperties/FeaturedProperties";
import Footer from "../../components/markets/footer/MarketFooter";
import Header from "../../components/markets/header/MarketHeader";
import MailList from "../../components/markets/mailList/MailList";
import PropertyList from "../../components/markets/propertyList/PropertyList";
import "./market.css";

const Market = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Header/>
      <div className="marketContainer">
        <Featured/>
        {/* <h1 className="marketTitle">Các loại hình nhả ở</h1>
        <PropertyList/> */}
        <h1 className="marketTitle">Tin mới đăng</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Market;
