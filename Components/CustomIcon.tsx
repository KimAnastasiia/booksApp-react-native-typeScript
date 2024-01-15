import React from 'react';
import { Image, ImageStyle } from 'react-native';

interface CustomIconProps {
  color: string;
}

const CustomIcon: React.FC<CustomIconProps> = ({ color }) => {

  return (
    <Image
      style={{
        width: 30,
        height: 30,
        tintColor: color,
      }}
      source={require('../assets/books.png')}
    />
  );

};

export default CustomIcon;
