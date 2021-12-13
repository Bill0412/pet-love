import img0 from "../../assets/images/pets/0.png"
import img1 from "../../assets/images/pets/1.png"
import img2 from "../../assets/images/pets/2.png"
import img3 from "../../assets/images/pets/3.png"
import img4 from "../../assets/images/pets/4.png"
import img5 from "../../assets/images/pets/5.png"
import img6 from "../../assets/images/pets/6.png"
import img7 from "../../assets/images/pets/7.png"
import img8 from "../../assets/images/pets/8.png"
import img9 from "../../assets/images/pets/9.png"
import img10 from "../../assets/images/pets/10.png"
import img11 from "../../assets/images/pets/11.png"
import img12 from "../../assets/images/pets/12.png"
import img13 from "../../assets/images/pets/13.png"
import img14 from "../../assets/images/pets/14.png"
import img15 from "../../assets/images/pets/15.png"
import img16 from "../../assets/images/pets/16.png"
import img17 from "../../assets/images/pets/17.png"

const nImgs = 18;
const imgs = [img0,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
    img16,
    img17
];


let itemData = [];

for(let i = 0; i < nImgs; ++i) {
    itemData.push({
        key: i,
        img: imgs[i],
        price: Math.floor(Math.random() * 10 + 1),
        age: Math.floor(Math.random() * 500 + 1)
    })
}

export default itemData;