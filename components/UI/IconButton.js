import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const IconButton = ({ icon, size, color ,onPress}) => {
  return (
    <Pressable onPress={onPress} style={({pressed})=> pressed && styles.pressed}>
      <View style={styles.bottonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    bottonContainer:{
        borderRadius:24,
        padding:6,
        marginHorizontal:8
    },
    pressed:{
        opacity:0.75,
    }
});

export default IconButton;
