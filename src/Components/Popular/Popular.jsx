import React from 'react';
import './popular.css';


import img from '../../Images/img18.jpg'
import img12 from '../../Images/img12.jpg'
import img8 from '../../Images/img8.jpg'
import img17 from '../../Images/img17.jpg'
import img16 from '../../Images/img16.jpg'

const Posts = [
  {
    id: 1,
    destImage: img,
    title: 'Nakuru'
  },
  {
    id: 2,
    destImage: img12,
    title: 'Diani',
  },
  {
    id: 3,
    destImage: img8,
    title: 'Kisumu',
    
  },
  {
    id: 4,
    destImage: img17,
    title: 'Malindi',
  },
  {
    id: 5,
    destImage: img16,
    title: 'Amboseli',
  },
];


const Popular = () => {
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 3,
  //   slidesToScroll: 1
  // };
  return (
    <section className="popular section container">
      <div className="secContainer">

        <div className="secHeader flex">
          <div className="secIntro">
            <h2 className="secTitle">
              Popular Destinations
            </h2>
            <p>Explore the stunning landscapes and diverse wildlife of Kenya, from national reserve safaris to traditional Swahili culture. Immerse yourself in the unique experiences. These destinations has offers!</p>
          </div>

          {/* <div className="iconsDiv flex">
            <BsArrowLeftShort className="icon leftIcon"/>
            <BsArrowRightShort className="icon"/>
          </div> */}
        </div>

        <div className="mainContent grid">
          {
            Posts.map(({id, destImage, title})=>{
              return(
                <div className="singleDestination">

                <div className="destImage">
                  <img src={destImage} alt={title} />
                </div>
    
                <div className="destFooter">
                  <div className="number">
                    {id}
                  </div>
    
                  <div className="destText flex">
                    <h2>{title}</h2>
                  </div>
                </div>
              </div>
              )
            })
          }
         
        </div>
      </div>
    </section>
  )
}

export default Popular
