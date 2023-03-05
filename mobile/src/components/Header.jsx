import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";


const Header = () => {
    const history = useNavigate();
    return (
        <View style={styles.header}>
            <Text onPress={() => history("/")} style={styles.text}>Home</Text>
            <Text style={styles.text}>Carrinho</Text>
            <Text style={styles.text}>Meus Pedidos</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "black",
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        top:0,
        alignItems: "center",
        height: 100,
        width: "100%",
        paddingHorizontal: 20,
        zIndex: 1
    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 46
    },
});

export default Header;
