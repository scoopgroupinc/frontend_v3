interface Image {
  name: string;
  image: any;
}

export class BackgroundImage {
  private static images: Array<Image> = [
    {
      name: "sad.png",
      image: require("../../../assets/images/sad.png"),
    },
    {
      name: "smile.png",
      image: require("../../../assets/images/smile.png"),
    },
    {
      name: "heart-eyes.png",
      image: require("../../../assets/images/heart-eyes.png"),
    },
    {
      name: "neutral.png",
      image: require("../../../assets/images/neutral.png"),
    },
  ];

  static GetImage = (name: string) => {
    const found = BackgroundImage.images.find((e) => e.name === name);
    return found ? found.image : null;
  };
}
