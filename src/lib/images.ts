/**
 * IREX Mining — Curated image library
 * All images are real photos from Unsplash/web, re-hosted on OSS
 */

export const images = {
  // Mining operations — excavators, open pit, industrial
  mining: [
    "https://sfile.chatglm.cn/images-ppt/0514a15d1fe1.jpeg",
    "https://sfile.chatglm.cn/images-ppt/04df4107776c.jpg",
    "https://sfile.chatglm.cn/images-ppt/95c12cc7484e.jpg",
    "https://sfile.chatglm.cn/images-ppt/4fa7dbc04708.jpg",
    "https://sfile.chatglm.cn/images-ppt/7a1718685b10.jpg",
    "https://sfile.chatglm.cn/images-ppt/3272b3910b9e.jpg",
    "https://sfile.chatglm.cn/images-ppt/c5573a762829.jpeg",
    "https://sfile.chatglm.cn/images-ppt/226af8b084a0.jpg",
  ],
  // Engineers / professionals
  engineer: [
    "https://sfile.chatglm.cn/images-ppt/73086b6933ab.jpg",
    "https://sfile.chatglm.cn/images-ppt/36dfd239f6d2.jpg",
    "https://sfile.chatglm.cn/images-ppt/7c884750f411.jpg",
    "https://sfile.chatglm.cn/images-ppt/db674a66f85b.jpg",
    "https://sfile.chatglm.cn/images-ppt/014459be7c0b.jpg",
    "https://sfile.chatglm.cn/images-ppt/480f3f31f20c.jpg",
  ],
  // Safety equipment / HSE
  hse: [
    "https://sfile.chatglm.cn/images-ppt/45e8b6cc5e07.jpg",
    "https://sfile.chatglm.cn/images-ppt/ad275eddf4ad.jpeg",
    "https://sfile.chatglm.cn/images-ppt/799a655525c1.jpg",
    "https://sfile.chatglm.cn/images-ppt/e6348a09b7be.jpg",
    "https://sfile.chatglm.cn/images-ppt/a395248d6d6a.png",
    "https://sfile.chatglm.cn/images-ppt/a1abd893bc83.jpg",
  ],
  // Team / corporate portraits
  team: [
    "https://sfile.chatglm.cn/images-ppt/62ffc9fb8e1e.jpg",
    "https://sfile.chatglm.cn/images-ppt/2dadb83f90c1.jpg",
    "https://sfile.chatglm.cn/images-ppt/9ce72928993d.jpeg",
    "https://sfile.chatglm.cn/images-ppt/e509d0089bf9.jpg",
    "https://sfile.chatglm.cn/images-ppt/23a0ac40d35d.jpg",
    "https://sfile.chatglm.cn/images-ppt/20fce139886d.jpg",
    "https://sfile.chatglm.cn/images-ppt/7873378c83dd.jpg",
    "https://sfile.chatglm.cn/images-ppt/9f4d2bdea171.jpg",
  ],
  // Construction sites
  construction: [
    "https://sfile.chatglm.cn/images-ppt/05f6c556a525.jpg",
    "https://sfile.chatglm.cn/images-ppt/6a910820313b.jpg",
    "https://sfile.chatglm.cn/images-ppt/f48e01c33d72.jpg",
    "https://sfile.chatglm.cn/images-ppt/8bf48f97112a.jpg",
    "https://sfile.chatglm.cn/images-ppt/5581521379d2.jpg",
    "https://sfile.chatglm.cn/images-ppt/690b24f0e8de.jpeg",
  ],
  // Industrial pumps / machines
  pump: [
    "https://sfile.chatglm.cn/images-ppt/7488c76bd6cc.png",
    "https://sfile.chatglm.cn/images-ppt/e0ba0d7600aa.jpeg",
    "https://sfile.chatglm.cn/images-ppt/e857cee33692.png",
    "https://sfile.chatglm.cn/images-ppt/35ad3b565762.png",
    "https://sfile.chatglm.cn/images-ppt/f1251dd939b5.png",
    "https://sfile.chatglm.cn/images-ppt/d6cdf6c423d2.jpg",
  ],
  // Nature / environment
  nature: [
    "https://sfile.chatglm.cn/images-ppt/6b8a65fdc1e9.jpg",
    "https://sfile.chatglm.cn/images-ppt/a8a5929c0251.png",
    "https://sfile.chatglm.cn/images-ppt/668b6ddd22cd.jpg",
    "https://sfile.chatglm.cn/images-ppt/a92f5f64c3d7.jpg",
  ],
  // Trucks / heavy vehicles
  truck: [
    "https://sfile.chatglm.cn/images-ppt/4b7f5b68b5f9.png",
    "https://sfile.chatglm.cn/images-ppt/9a8acffa1020.jpg",
    "https://sfile.chatglm.cn/images-ppt/52e0ba08861c.jpg",
    "https://sfile.chatglm.cn/images-ppt/700a906c2983.jpg",
    "https://sfile.chatglm.cn/images-ppt/9ce8352b8695.jpg",
    "https://sfile.chatglm.cn/images-ppt/6c45e80e0f1f.jpg",
  ],
  // Modern office buildings
  office: [
    "https://sfile.chatglm.cn/images-ppt/a7122f749665.jpg",
    "https://sfile.chatglm.cn/images-ppt/1e9fe81a5d4a.jpg",
    "https://sfile.chatglm.cn/images-ppt/9eff3f8d589e.jpeg",
    "https://sfile.chatglm.cn/images-ppt/28c01f758d65.jpg",
  ],
} as const;

// Curated hero backgrounds (mining/industrial)
export const heroImages = {
  primary: images.mining[0],
  secondary: images.mining[2],
  tertiary: images.mining[5],
};

// Service image mapping
export const serviceImages: Record<string, string> = {
  compass: images.mining[1],
  "hard-hat": images.construction[0],
  pickaxe: images.mining[3],
  leaf: images.nature[0],
  shield: images.hse[0],
  truck: images.truck[0],
  graduation: images.team[3],
  clipboard: images.office[0],
};

// Project images
export const projectImages = [
  images.mining[0],
  images.hse[1],
  images.nature[1],
  images.team[4],
  images.truck[2],
  images.construction[2],
];

// Product images
export const productImages = [
  images.hse[2],
  images.pump[0],
  images.office[1],
  images.team[5],
  images.nature[2],
  images.pump[3],
  images.construction[3],
  images.hse[3],
];

// Blog cover images
export const blogImages = [
  images.mining[4],
  images.hse[4],
  images.team[6],
  images.construction[4],
];

// Event images
export const eventImages = [
  images.team[7],
  images.hse[5],
  images.office[2],
  images.mining[6],
];

// Team avatars
export const teamAvatars = [
  images.team[0],
  images.team[1],
  images.team[2],
  images.engineer[0],
  images.engineer[1],
  images.engineer[2],
];

// About section image
export const aboutImage = images.mining[7];

// Testimonials background
export const testimonialBg = images.mining[1];

// CTA background
export const ctaBg = images.construction[5];
