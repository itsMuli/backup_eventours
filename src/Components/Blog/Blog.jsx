import React from 'react'
import './blog.css'
import { BsArrowRightShort } from 'react-icons/bs'
import img from '../../Images/img18.jpg'
import img12 from '../../Images/img12.jpg'
import img14 from '../../Images/img14.jpg'
import img15 from '../../Images/img15.jpg'
import img16 from '../../Images/img16.jpg'

const Posts = [
  {
    id: 1,
    postImage: img,
    title: 'Amboseli',
    desc: 'Amboseli has variety of wild animals and beautiful scenaries.'
  },
  {
    id: 2,
    postImage: img12,
    title: 'Maasai Mara',
    desc: 'Maasai Mara has variety of wild animals and beautiful scenaries.'
  },
  {
    id: 3,
    postImage: img14,
    title: 'Maasai Mara',
    desc: 'Maasai Mara has variety of wild animals and beautiful scenaries.'
  },
  {
    id: 4,
    postImage: img15,
    title: 'Maasai Mara',
    desc: 'Maasai Mara has variety of wild animals and beautiful scenaries.'
  },
  {
    id: 5,
    postImage: img16,
    title: 'Maasai Mara',
    desc: 'Maasai Mara has variety of wild animals and beautiful scenaries.'
  },
]


const Blog = () => {
  return (
    <section className="blog container section">
      <div className="secContainer">

        <div className="secIntro">
          <h2 className="secTitle">
            Our Best Blog
          </h2>
          <p>
            An insight to the incredible experience in Kenya.
          </p>
        </div>

        <div className="mainContainer grid">
          {
            Posts.map(({id, postImage, title, desc})=>{
              return(
                <div className="singlePost grid">
            <div className="imgDiv">
              <img src={postImage} alt={title} />
            </div>

            <div className="postDetails">
              <h3>
                {title}
              </h3>
              <p>{desc}</p>
            </div>

            <a href="#" className="flex">
            Read More
            <BsArrowRightShort className='icon'/>
            </a>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default Blog
