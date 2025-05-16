import banner1 from '../../../../assets/banner1.png'
import banner2 from '../../../../assets/banner2.png'
import banner3 from '../../../../assets/banner3.png'
import "./BannerPoster.css";
export default function Banner(){
    return (
        <div className="Banner-Section">
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="box">
                            <img className='w-100 transition' src={banner1} alt='banner1'/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="box">
                            <img className='w-100 transition' src={banner2} alt='banner1'/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="box">
                            <img className='w-100 transition' src={banner3} alt='banner1'/>
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
    );
}