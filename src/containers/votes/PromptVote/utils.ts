interface Image {
  name: string;
  image: any;
}

export class BackgroundImage {
  private static images: Array<Image> = [
    {
      name: "sad.png",
      image: require("src/assets/images/sad.png"),
    },
    {
      name: "smile.png",
      image: require("src/assets/images/smile.png"),
    },
    {
        name: "heart-eyes.png",
        image: require("src/assets/images/heart-eyes.png"),
    },
    {
        name: "neutral.png",
        image: require("src/assets/images/neutral.png"),
    },
  ];

  static GetImage = (name: string) => {
    const found = BackgroundImage.images.find((e) => e.name === name);
    return found ? found.image : null;
  };
}
