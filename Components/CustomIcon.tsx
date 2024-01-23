import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

interface CustomIconProps {
  color: string;
  img: string
  onPress?: ()=>void,
  nameOfComponent?:string
}

const CustomIcon: React.FC<CustomIconProps> = ({ color, img, onPress, nameOfComponent }) => {
if(nameOfComponent=="logOut"){
  return (
    <TouchableOpacity onPress={onPress} >
      <Image
        style={{
          width: 30,
          height: 30,
          tintColor: color,
        }}
        source={img}
      />
    </TouchableOpacity>
  );
}else{
  return (
      <Image
        style={{
          width: 30,
          height: 30,
          tintColor: color,
        }}
        source={img}
      />
  );
}


};

export default CustomIcon;
