import React, { useState } from 'react'
import './blog.css'
import { BsArrowRightShort } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'

import img from '../../Images/img18.jpg'
import img12 from '../../Images/img12.jpg'
import img14 from '../../Images/img14.jpg'
import img15 from '../../Images/img15.jpg'
import img16 from '../../Images/img16.jpg'

const Posts = [
  {
    id: 1,
    postImage: img,
    title: 'Amboseli National Park: The Land of Giants',
    desc: 'Known for its large elephant herds and views of immense Mount Kilimanjaro, across the border in Tanzania.',
    category: 'Nature',
    content: 'Amboseli National Park is located in southern Kenya. It’s known for its many elephants and views of immense Mount Kilimanjaro, across the border in Tanzania. Observation Hill offers panoramas of the peak and the park’s plains and swamps. Wildlife includes giraffes, zebras, cheetahs and hundreds of bird species. The western section is dominated by Lake Amboseli, which is dry outside the rainy season.'
  },
  {
    id: 2,
    postImage: img12,
    title: 'Maasai Mara: A Wildlife Spectacle',
    desc: 'The Maasai Mara is one of the most famous and important wildlife conservation and wilderness areas in Africa.',
    category: 'Adventure',
    content: 'Maasai Mara National Reserve is an area of preserved savannah wilderness in southwestern Kenya, along the Tanzanian border. Its animals include lions, cheetahs, elephants, zebras and hippos. Wildebeest traverse its plains during their annual migration. The landscape has grassy plains and rolling hills, and is crossed by the Mara and Talek rivers. The area nearby is dotted with villages (enas) of Maasai people.'
  },
  {
    id: 3,
    postImage: img14,
    title: 'Diani Beach: Africa’s Hidden Paradise',
    desc: 'Voted one of the best beaches in Africa, Diani offers pristine white sands and turquoise waters.',
    category: 'Beach',
    content: 'Diani Beach is a major beach on the Indian Ocean coast of Kenya. It is located 30 kilometres south of Mombasa, in Kwale County. It has been voted Africa\'s leading beach destination for the fifth time running since 2015. The beach is about 17 kilometres long, from the Kongo river to the north and Galu beach to the south. It is adjacent to the town of Ukunda, the Ukunda Airstrip maintains a local flight connection to Nairobi.'
  },
  {
    id: 4,
    postImage: img15,
    title: 'Lake Nakuru: The Pink Flamingo Haven',
    desc: 'A beautiful lake surrounded by bushy and wooded grasslands, famous for its thousands of flamingos.',
    category: 'Nature',
    content: 'Lake Nakuru National Park is one of Kenya\'s two Premium Parks, and is a birdlover’s paradise. It surrounds Lake Nakuru, located in the Central Rift Conservation Area in the Southern Rift Valley region of Kenya. Originally declared a bird sanctuary, the park was upgraded to National Park status in 1968. Established in 1961, it is 188 square km and is home to flamingos, white rhinos, and lions.'
  },
  {
    id: 5,
    postImage: img16,
    title: 'Mount Kenya: Scaling the African Giant',
    desc: 'The highest mountain in Kenya and the second-highest in Africa, a UNESCO World Heritage site.',
    category: 'Adventure',
    content: 'Mount Kenya is the highest mountain in Kenya and the second-highest in Africa, after Kilimanjaro. The highest peaks of the mountain are Batian (5,199 metres), Nelion (5,188 metres) and Point Lenana (4,985 metres). Mount Kenya is located in the former Eastern and Central provinces of Kenya; its summit is on the border of Meru, Embu, Laikipia, Kirinyaga, Nyeri and Tharaka Nithi counties.'
  },
]

const Categories = ['All', 'Adventure', 'Beach', 'Nature'];

const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedPost, setSelectedPost] = useState(null);

    const filteredPosts = selectedCategory === 'All' 
        ? Posts 
        : Posts.filter(post => post.category === selectedCategory);

    const openArticle = (post) => {
        setSelectedPost(post);
    }

    const closeArticle = () => {
        setSelectedPost(null);
    }

    return (
        <section id="blog" className="blog container section">
            <div className="secContainer">

                <div className="secIntro">
                    <h2 className="secTitle">
                        Our Travel Blog
                    </h2>
                    <p>
                        Insights and stories from the incredible experiences across Kenya.
                    </p>
                </div>

                <div className="blogCategories flex">
                    {Categories.map((cat, index) => (
                        <button 
                            key={index} 
                            className={`catBtn ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="mainContainer grid">
                    {
                        filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => {
                                return (
                                    <div key={post.id} className="singlePost grid">
                                        <div className="imgDiv">
                                            <img src={post.postImage} alt={post.title} />
                                        </div>

                                        <div className="postDetails">
                                            <h3>{post.title}</h3>
                                            <p>{post.desc}</p>
                                            <button onClick={() => openArticle(post)} className="readMore flex">
                                                Read More <BsArrowRightShort className="icon" />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="noPosts">No posts found for this category.</div>
                        )
                    }
                </div>
            </div>

            {/* Article Modal */}
            {selectedPost && (
                <div className="articleModal flex">
                    <div className="modalContent">
                        <AiOutlineClose className="closeIcon icon" onClick={closeArticle} />
                        <div className="modalImage">
                            <img src={selectedPost.postImage} alt="" />
                        </div>
                        <div className="modalBody">
                            <span className="category">{selectedPost.category}</span>
                            <h3>{selectedPost.title}</h3>
                            <div className="content">
                                <p>{selectedPost.content}</p>
                                <p>Kenya offers a blend of adventure, culture, and natural beauty that is unparalleled. Whether you are seeking the thrill of a safari in the Maasai Mara or the tranquility of the white sands in Diani, there is something for everyone in this beautiful country.</p>
                            </div>
                            <button className="btn" onClick={closeArticle}>Back to Blog</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Blog
