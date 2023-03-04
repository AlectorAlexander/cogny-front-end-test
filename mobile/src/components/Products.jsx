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
                <TouchableOpacity onPress={() => console.log("Botão clicado!")}>
                    <Text>Clique aqui</Text>
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
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: "#fff",
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    cardImage: {
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10,
    },
});

export default Products;
