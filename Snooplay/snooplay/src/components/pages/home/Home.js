import CatSlider from "./slider/catSlider/CatSlider";
import HomeSlider from "./slider/homeSlider/HomeSlider";
import Banner from "./Banner/BannerPoster";
import Footer from "../../footer/Footer";
import Popular from "./popular/Popular";
export default function Home(){
    return (
        <div>
         <HomeSlider/>
        <CatSlider/>
        <Banner />
        <Popular/>
     
       
        </div>);
}