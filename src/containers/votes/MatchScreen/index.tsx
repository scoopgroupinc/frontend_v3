import {MaterialIcons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {LinearGradient} from 'expo-linear-gradient'
import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Button} from 'src/components/atoms/Button'
import {Input} from 'src/components/atoms/Input'
import LikeButton from 'src/components/atoms/LikeButton'
import {
  RemoveActiveMatch,
  selectMatchedUsers,
  selectUserMatches,
} from 'src/store/features/UserMatchesSlice'
import {useAppDispatch, useAppSelector} from 'src/store/hooks'
import {Colors} from 'src/styles'
import {styles} from './styles'
import {Socket, io} from 'socket.io-client'
import {selectUser} from 'src/store/features/UserProfileSlice'
import {Spacing, Typography} from 'src/styles'
import { logEvent, onScreenView } from 'src/analytics'
import { eventNames, screenClass, screenNames } from 'src/analytics/constants'

export const MatchScreen = () => {
  const [message, setMessage] = useState<string>('')
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const hasUnsavedChanges = false
  const reduxUser = useAppSelector(selectUser)
  const token = reduxUser?.token

  const dispatch = useAppDispatch()
  const userMatches = useAppSelector(selectUserMatches)
  const userProfile = userMatches[0].profile

  const matchedUsers = useAppSelector(selectMatchedUsers)
  const [user1, user2] = matchedUsers
  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL]

  const socket: Socket = io('http://scoopchat-dev.eba-cqqr2rky.us-east-1.elasticbeanstalk.com', {
    transports: ['websocket', 'polling'],
    upgrade: false,
    reconnectionAttempts: Infinity,
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  })

  const handleClose = () => {
    initiateChat()
    logEvent({
      eventName: eventNames.closeConversationStarterButton,
      params:{
        userId:user2?.userId,
        screenClass:screenClass.matches}
    })
    dispatch(
      RemoveActiveMatch({
        activeMatchId: userMatches[0].id,
      })
    )
  }

  useEffect(
    () =>{
      navigation.addListener('beforeRemove', (e) => {
        e.preventDefault()
        initiateChat()
        onScreenView({
          screenName:screenNames.startConversation,
          screenType:screenClass.matches,
         })
      });
      onScreenView({
        screenName:screenNames.matchMade,
        screenType:screenClass.matches,
       })
    },
    [navigation]
  )

  const initiateChat = () => {
    const payload = {
      userID: user1.userId,
      receiverID: user2.userId,
      content: message,
      createdAt: moment().toISOString(),
    }

    socket.emit('addMessage', payload)
  }

  const sendChatMessage = () => {
    initiateChat()
    dispatch(
      RemoveActiveMatch({
        activeMatchId: userMatches[0].id,
      })
    )
    logEvent({
      eventName: eventNames.submitConversationStarterButton,
      params:{
        userId:reduxUser?.userId,
        screenClass:screenClass.matches}
    })
    navigation.navigate('conversations')
  }

  return (
    <LinearGradient style={{flex: 1}} colors={gradient}>
      <SafeAreaView style={{flex: 1}} edges={['left', 'right', 'top', 'bottom']}>
        <View style={styles.container}>
          {/* <TouchableOpacity onPress={handleClose} style={styles.closeIcon}>
            <MaterialIcons name='close' size={42} color={Colors.WHITE} />
          </TouchableOpacity> */}
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              marginTop: 140,
              marginBottom: 60,
            }}
          >
            <Text style={styles.text}>It's a Match!</Text>
            <View style={styles.imageWrapper}>
              <Image
                style={styles.image}
                source={{
                  uri: user1?.pic,
                }}
              />
              <Image
                style={styles.image}
                source={{
                  uri: user2?.pic,
                }}
              />
              <View style={styles.match}>
                <LikeButton width={90} height={90} />
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              paddingHorizontal: 20,
              justifyContent: 'flex-start',
            }}
          >
            <Text style={styles.label}>Initiate a conversation</Text>
            {/* <Input onChangeText={(e) => setMessage(e)} /> */}
            <TextInput
              placeholder='Comments'
              style={styles.input}
              onChangeText={(e) => setMessage(e)}
            />
            <Button title='Submit' disabled={message.length === 0} onPress={sendChatMessage} />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}
