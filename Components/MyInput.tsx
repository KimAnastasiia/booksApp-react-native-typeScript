import { TextInput, View, Text, Pressable,Alert, TouchableOpacity,TextInputFocusEventData,NativeSyntheticEvent  } from 'react-native';
import styles from '../Utility/styles';
type onChangeTextFunction = (param: string ) => void;
type onBlurFunction = (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
interface InputWithLabelProps {
    onChangeText:onChangeTextFunction,
    value:string,
    placeholder:string,
    secureTextEntry:boolean,
    onBlur?:onBlurFunction
}

const MyInput: React.FC<InputWithLabelProps> = ({onChangeText,value,placeholder,secureTextEntry, onBlur}) => {

    return (
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onBlur={onBlur}
      />

  );
};

export default MyInput