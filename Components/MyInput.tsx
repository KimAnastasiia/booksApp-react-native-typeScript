import { TextInput, View, Text, Pressable, Alert, TouchableOpacity, TextInputFocusEventData, NativeSyntheticEvent } from 'react-native';
import styles from '../Utility/styles';
type onChangeTextFunction = (param: string) => void;
type onBlurFunction = (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
interface InputWithLabelProps {
  onChangeText?: onChangeTextFunction,
  value: string,
  placeholder?: string,
  secureTextEntry: boolean,
  onBlur?: onBlurFunction,
  label:string,
  editable?:boolean
}

const MyInput: React.FC<InputWithLabelProps> = ({ onChangeText,label, editable, value, placeholder, secureTextEntry, onBlur }) => {

  return (
    <View style={{paddingLeft:20, }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onBlur={onBlur}
        editable={editable}
      />
    </View>

  );
};

export default MyInput