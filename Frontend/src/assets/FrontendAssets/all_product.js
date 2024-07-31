import p1_img from "./product_1.png";
import p2_img from "./product_2.png";
import p3_img from "./product_3.png";
import p4_img from "./product_4.png";
import p5_img from "./product_5.png";
import p6_img from "./product_6.png";
import p7_img from "./product_7.png";
import p8_img from "./product_8.png";
import p9_img from "./product_9.png";
import p10_img from "./product_10.png";
import p11_img from "./product_11.png";
import p12_img from "./product_12.png";
import p13_img from "./product_13.png";
import p14_img from "./product_14.png";
import p15_img from "./product_15.png";
import p16_img from "./product_16.png";
import p17_img from "./product_17.png";
import p18_img from "./product_18.png";
import p19_img from "./product_19.png";
import p20_img from "./product_20.png";

let all_product = [
  {
    id: 1,
    name: "Striped Flutter",
    category: "women",
    size: "s",
    color: "black",
    image: p1_img,
    new_price: 50.0,
    old_price: 80.5,
    description:
      "A stylish black flutter sleeve top perfect for casual outings.",
    stock: 15,
  },
  {
    id: 2,
    name: "Striped Flutter",
    category: "women",
    size: "m",
    color: "white",
    image: p2_img,
    new_price: 85.0,
    old_price: 120.5,
    description:
      "Elegant white flutter sleeve top, ideal for both work and leisure.",
    stock: 10,
  },
  {
    id: 3,
    name: "Striped Flutter Sleeve",
    category: "women",
    size: "l",
    color: "black",
    image: p3_img,
    new_price: 60.0,
    old_price: 100.5,
    description:
      "Classic black striped flutter sleeve top, a must-have in your wardrobe.",
    stock: 20,
  },
  {
    id: 4,
    name: "Striped Flutter Sleeve",
    category: "women",
    size: "s",
    color: "white",
    image: p4_img,
    new_price: 100.0,
    old_price: 150.0,
    description:
      "Versatile white flutter sleeve top, easy to pair with any bottom.",
    stock: 0,
  },
  {
    id: 5,
    name: "Striped Flutter Sleeve",
    category: "women",
    size: "m",
    color: "black",
    image: p5_img,
    new_price: 85.0,
    old_price: 120.5,
    description: "Chic black flutter sleeve top with a flattering fit.",
    stock: 12,
  },
  {
    id: 6,
    name: "Striped Flutter Sleeve",
    category: "women",
    size: "l",
    color: "white",
    image: p6_img,
    new_price: 85.0,
    old_price: 120.5,
    description: "Comfortable and stylish white top with flutter sleeves.",
    stock: 18,
  },
  {
    id: 7,
    name: "Men's Casual Shirt",
    category: "men",
    size: "m",
    color: "blue",
    image: p7_img,
    new_price: 65.0,
    old_price: 90.5,
    description:
      "Casual blue shirt with a classic fit, perfect for everyday wear.",
    stock: 25,
  },
  {
    id: 8,
    name: "Men's Formal Shirt",
    category: "men",
    size: "l",
    color: "white",
    image: p8_img,
    new_price: 95.0,
    old_price: 130.5,
    description:
      "Elegant white formal shirt for a sharp and professional look.",
    stock: 30,
  },
  {
    id: 9,
    name: "Men's Polo Shirt",
    category: "men",
    size: "s",
    color: "red",
    image: p9_img,
    new_price: 45.0,
    old_price: 70.0,
    description: "Classic red polo shirt, a staple for casual wardrobes.",
    stock: 22,
  },
  {
    id: 10,
    name: "Men's Polo Shirt",
    category: "men",
    size: "m",
    color: "green",
    image: p10_img,
    new_price: 50.0,
    old_price: 75.0,
    description: "Versatile green polo shirt, perfect for any casual occasion.",
    stock: 28,
  },
  {
    id: 11,
    name: "Kid's Blue Jacket",
    category: "kid",
    size: "s",
    color: "blue",
    image: p11_img,
    new_price: 40.0,
    old_price: 60.5,
    description: "Warm and cozy blue jacket for kids, ideal for chilly days.",
    stock: 14,
  },
  {
    id: 12,
    name: "Kid's Red Jacket",
    category: "kid",
    size: "m",
    color: "red",
    image: p12_img,
    new_price: 45.0,
    old_price: 65.0,
    description:
      "Bright red jacket for kids, adding a pop of color to their wardrobe.",
    stock: 20,
  },
  {
    id: 13,
    name: "Kid's Yellow T-shirt",
    category: "kid",
    size: "s",
    color: "yellow",
    image: p13_img,
    new_price: 35.0,
    old_price: 55.5,
    description:
      "Fun and vibrant yellow T-shirt for kids, perfect for playtime.",
    stock: 18,
  },
  {
    id: 14,
    name: "Kid's Green T-shirt",
    category: "kid",
    size: "m",
    color: "green",
    image: p14_img,
    new_price: 38.0,
    old_price: 58.0,
    description: "Comfortable green T-shirt for kids, great for everyday wear.",
    stock: 22,
  },
  {
    id: 15,
    name: "Women's Floral Dress",
    category: "women",
    size: "s",
    color: "floral",
    image: p15_img,
    new_price: 75.0,
    old_price: 100.0,
    description:
      "Beautiful floral dress with a flowing silhouette, perfect for summer.",
    stock: 10,
  },
  {
    id: 16,
    name: "Women's Evening Gown",
    category: "women",
    size: "m",
    color: "black",
    image: p16_img,
    new_price: 150.0,
    old_price: 200.0,
    description: "Elegant black evening gown, ideal for special occasions.",
    stock: 5,
  },
  {
    id: 17,
    name: "Women's Casual Top",
    category: "women",
    size: "l",
    color: "white",
    image: p17_img,
    new_price: 40.0,
    old_price: 60.0,
    description: "Simple yet stylish white top, perfect for a relaxed day out.",
    stock: 18,
  },
  {
    id: 18,
    name: "Men's Denim Jacket",
    category: "men",
    size: "l",
    color: "blue",
    image: p18_img,
    new_price: 120.0,
    old_price: 160.0,
    description:
      "Classic blue denim jacket, a versatile piece for any wardrobe.",
    stock: 12,
  },
  {
    id: 19,
    name: "Men's Leather Jacket",
    category: "men",
    size: "m",
    color: "brown",
    image: p19_img,
    new_price: 200.0,
    old_price: 250.0,
    description:
      "Stylish brown leather jacket, perfect for a rugged and timeless look.",
    stock: 7,
  },
  {
    id: 20,
    name: "Kid's Pink Dress",
    category: "kid",
    size: "l",
    color: "pink",
    image: p20_img,
    new_price: 55.0,
    old_price: 75.0,
    description:
      "Adorable pink dress for kids, ideal for special occasions or parties.",
    stock: 15,
  },
];

export default all_product;
