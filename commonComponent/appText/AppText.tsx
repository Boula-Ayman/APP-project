import React from 'react';
import { Text } from 'react-native';

type AppTextProps = {
  text: string;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  fontWeight?: string;
  style?: any;
};

const AppText = ({
  text,
  fontSize,
  color,
  fontFamily,
  fontWeight,
  style,
}: AppTextProps) => {
  return (
    <Text
      style={[
        {
          fontSize: fontSize || 14,
          color: color || 'white',
          fontFamily: fontFamily || 'InterRegular',
          fontWeight: fontWeight || '400',
        },
        style,
      ]}
    >
      {text}
    </Text>
  );
};

export default AppText;
