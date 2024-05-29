import React, { useEffect } from 'react';
import Animated, { withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

interface Props {
  ActiveDot: {
    carouselActiveIndex: number;
    width: number;
  };
  id: number;
}

const CarouselDot: React.FC<Props> = (props) => {
  const { ActiveDot, id } = props;
  const DotWidth = useSharedValue(12);
  const AnimatedDotWidth = useAnimatedStyle(() => ({
    width: DotWidth.value,
  }));

  useEffect(() => {
    if (ActiveDot.carouselActiveIndex === id) {
      DotWidth.value = withTiming(ActiveDot.width, { duration: 100 });
    } else {
      DotWidth.value = 12;
    }
  }, [ActiveDot, id, DotWidth]);

  return (
    <Animated.View style={AnimatedDotWidth}></Animated.View>
  );
};

export default CarouselDot;
