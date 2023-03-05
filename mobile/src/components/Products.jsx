import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Products = ({ card }) => {
    const { model, price, url_image } = card;
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <Text style={styles.title}>{model}</Text>
                <Image source={{ uri: url_image }} style={styles.cardImage} />
                <Text style={styles.title}>{`por R$${price}`}</Text>
                <TouchableOpacity style={styles.button} onPress={() => console.log("Botão clicado!")}>
                    <Text style={styles.buttonText}>Clique aqui</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

Products.propTypes = {
    card: PropTypes.shape({
        model: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        url_image: PropTypes.string.isRequired,
    }).isRequired,
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "red",
        borderRadius: 5,
        paddingVertical: 10,
        width: 376,
        zIndex: 1,
        marginTop: 20
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    card: {
        borderRadius: 26,
        width: 376,
        elevation: 3,
        backgroundColor: "#fff",
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 16,
        paddingTop: 20
    },
    title: {
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold",
        color: "#333",
    },
    cardImage: {
        height: 290,
        width: 290,
        borderRadius: 10,
        marginBottom: 10,
    },
    cardContent: {
        display: "flex",
        alignItems: "center"
    },
});

export default Products;
