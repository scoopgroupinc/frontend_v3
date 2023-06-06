import React, { useState } from "react";
import { Slider } from "@miblanchard/react-native-slider";
import { styles } from "./styles";
import { Colors } from "../../../utils";
import { BackgroundImage } from "../../../containers/votes/PromptVote/utils";

interface RatingSiderType {
  rating: (rate: number) => void;
}

export const RatingSlider = ({ rating }: RatingSiderType) => {
  const [ratingValue, setRating] = useState<any>({
    value: 0.5,
    image: require("../../../assets/images/cool.png"),
    minTrackColor: Colors.YELLOW,
  });
  const onSliderChange = (type: number, val: any) => {
    val = Array.isArray(val) ? val[0] : val;
    let emotions = {};
    if (val >= 0 && val <= 0.33) {
      emotions = {
        image: BackgroundImage.GetImage(`sad.png`),
        minTrackColor: Colors.YELLOW,
      };
    }
    if (val > 0.33 && val <= 0.66) {
      emotions = {
        image: BackgroundImage.GetImage(`neutral.png`),
        minTrackColor: Colors.TEAL,
      };
    }
    // if (val > 0.5 && val <= 0.75) {
    //     emotions={
    //         image: BackgroundImage.GetImage(`smile.png`),
    //         minTrackColor: Colors.RUST,
    //     }
    // }
    if (val > 0.66 && val <= 1) {
      emotions = {
        image: BackgroundImage.GetImage(`heart-eyes.png`),
        minTrackColor: Colors.GRAY_BLUE,
      };
    }
    setRating({
      value: val,
      ...emotions,
    });

    rating(val);
  };

  return (
    <Slider
      value={ratingValue.value}
      maximumValue={1}
      step={0.33}
      minimumTrackTintColor={ratingValue.minTrackColor}
      maximumTrackTintColor={Colors.WHITE}
      thumbImage={ratingValue.image}
      thumbStyle={styles.thumbStyle}
      trackStyle={styles.trackStyle}
      onValueChange={(val) => onSliderChange(1, val)}
    />
  );
};
