import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const { userID, name, selectedColor } = route.params; // Get user ID, name and color from route
  const [messages, setMessages] = useState([]);

  // Fetch messages and listen for updates
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesList = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(), // Convert Timestamp to Date
          user: {
            _id: data.user._id,
            name: data.user.name,
          },
        };
      });
      setMessages(messagesList);
    });

    return () => unsubscribe();
  }, [db]);

  // Handle sending new messages
  const onSend = async (newMessages) => {
    const message = newMessages[0];
    try {
      await addDoc(collection(db, "messages"), {
        text: message.text,
        createdAt: new Date(),
        user: message.user,
      });
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  // Customize the chat bubble style
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#6D7883", // Sent bubble color
          },
          left: {
            backgroundColor: "#EAEAEA", // Received bubble color
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

  // Set nav title to user's name
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
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: userID, // Use a fixed user ID (replace with your actual user ID logic)
          name: name, // Use the name passed in from route.params
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
