import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    height: 54,
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 10,
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '43%',
  },
  rightSideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '20%',
  },
});