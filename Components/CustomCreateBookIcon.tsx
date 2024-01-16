import React from 'react';
import { Image, ImageStyle } from 'react-native';

interface CustomIconProps {
  color: string;
}

const CustomCreateBookIcon: React.FC<CustomIconProps> = ({ color }) => {

  return (
    <Image
      style={{
        width: 30,
        height: 30,
        tintColor: color,
      }}
      source={require('../assets/add.png')}
    />
  );

};

export default CustomCreateBookIcon;
