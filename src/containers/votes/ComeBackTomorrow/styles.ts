import {StyleSheet} from 'react-native'
import {Colors, Typography} from 'src/styles'

export const styles = StyleSheet.create({
  text: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_24,
    fontFamily: Typography.FONT_POPPINS_REGULAR,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
    top: 90,
    position: 'absolute',
    width: 160,
  },
  image: {
    height: 140,
    width: 140,
    borderRadius: 100,
    borderColor: Colors.WHITE,
    borderWidth: 5,
  },
  imageWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 180,
    position: 'absolute',
    justifyContent: 'space-between',
  },
  match: {
    height: 70,
    width: 70,
    position: 'absolute',
    left: 100,
    top: 80,
    // borderRadius:150,
    // borderColor:Colors.WHITE,
    // borderWidth:10
  },
  input: {
    borderRadius: 10,
    width: 350,
    backgroundColor: Colors.WHITE,
  },
  btn: {
    marginTop: 20,
  },
  label: {
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.WHITE,
    fontFamily: Typography.FONT_POPPINS_REGULAR,
  },
  closeIcon: {
    height: 50,
    left: 155,
    position: 'absolute',
    top: 0,
  },
  noMatchLogo: {
    height: 200,
    width: 200,
  },
  noMatchText: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_20,
    fontFamily: Typography.FONT_POPPINS_REGULAR,
    textAlign: 'center',
  },
  textWrapper: {
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: 240,
  },
})
