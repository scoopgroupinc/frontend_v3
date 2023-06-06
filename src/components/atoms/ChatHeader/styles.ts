import {StyleSheet} from 'react-native'
import {Colors} from '../../../utils'

export const styles = StyleSheet.create({
  backBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
  },
  container: {
    flexDirection: 'row',
    height: 50,
    borderBottomColor: Colors.ICE_WHITE,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  chatName: {
    fontSize: 18,
    textAlign: 'center',
  },
  chatImage: {width: 40, height: 40, borderRadius: 20},
})
