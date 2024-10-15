import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const { name, selectedColor } = route.params;
  const [messages, setMessages] = useState([]);
  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#6D7883", // Sent bubble color
          },
          left: {
            backgroundColor: "#EAEAEA", //Received bubble color
          },
        }}
        textStyle={{
          right: {
            color: "#FFFFFF", // Sent text color
          },
          left: {
            color: "#333333", // Received text color
          },
        }}
      />
    );
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: `Hi ${name}!`, //Static user message
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "John Doe",
          avatar: "https://picsum.photos/140/140",
        },
      },
      {
        _id: 2,
        text: `${name} has entered the chat.`, //System message
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [name, navigation]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: selectedColor || "#090C08" }, // Fallback background color if none selected
      ]}
    >
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" /> // Android keyboard optimization
      ) : null}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" /> // iOS keyboard optimization
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
