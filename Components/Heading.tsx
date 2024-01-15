// HeadingComponent.tsx

import React from 'react';
import { Text } from 'react-native';
import myStyles from '../Utility/styles';

interface HeadingProps {
  children: string;
}

const Heading: React.FC<HeadingProps> = ({ children }) => (
  <Text style={myStyles.heading}>
    {children}
  </Text>
);

export default Heading;
