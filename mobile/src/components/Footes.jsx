import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer = () => {
    return (
        <View style={styles.footer}>
            <Text style={styles.text}>CognyShoes Challenge</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        position: "absolute",
        bottom:0,
        height: 50,
    },
    text: {
        color: "white",
    },
});

export default Footer;
