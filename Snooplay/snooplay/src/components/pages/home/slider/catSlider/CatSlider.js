import React, { useState } from "react";
import Slider from 'react-slick';
import './CatSlider.css';


export default function CatSlider(){

    const data = [ 
        {color :'#fff3ff',image:'https://snooplay.in/cdn/shop/files/Age-Cards---Website---0-11-months_540x.jpg?v=1701674921',name:'Custard Apple'},
        {color :'#feefea',image:'https://snooplay.in/cdn/shop/files/Age-Cards---Website---1-2-Years_360x.jpg?v=1701674944',name:"Strawberry"},
        {color :'#fffceb',image: 'https://snooplay.in/cdn/shop/files/Age-Cards---Website---3-6-Years_360x.jpg?v=1701677016',name: "Peach"},
       {color :'#f2fce4',image:'https://snooplay.in/cdn/shop/files/Age-Cards---Website---7-12-Years_540x.jpg?v=1701677082',name:'Green Grapes'},
       {color :'#fff3ff',image:'https://snooplay.in/cdn/shop/files/Age-Cards---Website---13-17-Years_360x.jpg?v=1701677143',name:'Orange'},
       {color :'#feefea',image:'https://snooplay.in/cdn/shop/files/Age-Cards---Website---Grown-Ups_360x.jpg?v=1701677171',name:'Black Plum'},
     
    ];


    const [itemBg,setItemBg] = useState(data);
       
        
    
   
   var settings  ={
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        fade:false,
        arrow: true
    }
    return (
        <div className="CatSliderSection">
            <div className='container-fluid'>
                <h2 className='hd'>Featured Categories</h2>
                
                    <Slider {...settings} className="cat_slider_main" id="cat_slider_main">
                        {
                            itemBg.length!==0&&itemBg.map((item)=>{
                                return (
                                    
                                        <div className="info" style={{background:item.color}}>
                                            <img src={item.image} alt="mango" />
                                            
                                        </div>
                                    
                                );
                            })
                        }
                        
                            
                    </Slider>
            </div>
        </div>
    );
}