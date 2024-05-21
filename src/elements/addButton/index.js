import style from './style';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddButton = ({ onPress }) => (
  <TouchableOpacity style={style.addIcon} onPress={onPress}>
    <Icon name="plus" size={32} color="#FFFFFF" />
  </TouchableOpacity>
);

export default AddButton;
