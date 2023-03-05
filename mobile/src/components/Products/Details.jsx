/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import firestore from "@react-native-firebase/firestore";
import { useNavigate, useParams } from "react-router";
import Context from "../../context/Context";
import { AsyncStorage, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function Details() {
    const { Details, setDetails } = useContext(Context);
    const { id } = useParams();
    const [showReadyHave, setShowReadyHave] = useState(false);
    const [showDontHave, setShowDontHave] = useState(false);

    const history = useNavigate();

    const handleCloseHave = () => setShowReadyHave(false);
    const handleCloseDontHave = () => setShowDontHave(false);

    const seeTheCart = () => history("/cart");
    const seeTheProducts = () => history("/products");

    const addItem = async () => {
        try {
            const actualCart = JSON.parse(await AsyncStorage.getItem("cart"));
            if (actualCart?.length) {
                const readyHave = actualCart.some((item) => item.id === id);
                if (readyHave) {
                    return setShowReadyHave(true);
                }
                const newActualCart = JSON.stringify([...actualCart, Details]);
                setShowDontHave(true);
                await AsyncStorage.setItem("cart", newActualCart);
            } else {
                const newElementCart = JSON.stringify([Details]);
                setShowDontHave(true);
                await AsyncStorage.setItem("cart", newElementCart);
            }
        } catch (error) {
            console.log("Error adding item to cart: ", error);
        }
    };

    const request = async () => {
        const collectionRef = firestore().collection("shoes");
        const documentRef = collectionRef.doc(id);

        documentRef.get().then((doc) => {
            if (doc.exists) {
                setDetails(doc.data());
            } else {
                console.log("Documento não encontrado");
            }
        }).catch((error) => {
            console.log("Erro ao buscar documento:", error);
        });
    };

    const ModalReadyHave = () => {
        return (
            <Modal visible={showReadyHave} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Você já adicionou esse produto!</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={handleCloseHave}>
                                <Text style={styles.modalButtonText}>OK</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={seeTheCart}>
                                <Text style={styles.modalButtonText}>Ver no carrinho</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={seeTheProducts}>
                                <Text style={styles.modalButtonText}>Ver mais produtos</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    const ModalDontHave = () => {
        return (
            <Modal animationType="slide" visible={showDontHave} onRequestClose={handleCloseDontHave}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.cardTitle} >Produto Adicionado!</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton}onPress={handleCloseDontHave}><Text style={styles.modalButtonText}>
                        OK
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton}onPress={seeTheCart}><Text style={styles.modalButtonText}>
                        Ver no carrinho
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton}onPress={seeTheProducts} ><Text style={styles.modalButtonText}>
                        Ver mais produtos
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    useEffect(() => {
        if (!Details) {
            request();
        }
    }, []);


    
    function render() {
        const { model, price, url_image, description } = Details;
        return (
            <View style={styles.detailsContainer}>
                <ModalReadyHave isVisible={showReadyHave} handleClose={handleCloseHave} />
                <ModalDontHave isVisible={showDontHave} handleClose={handleCloseDontHave} />
                <Image style={styles.detailImage} source={{ uri: url_image }} />
                <View style={styles.detailCard}>
                    <Text style={styles.cardTitle}>{model}</Text>
                    <View>
                        <Text style={styles.price}>{`por R$${price}`}</Text>
                        <Text style={styles.description}>{description}</Text>
                    </View>

                    <TouchableOpacity onPress={addItem} style={styles.button}>
                        <Text style={styles.buttonText}>Adicionar Produto no Carrinho</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
          
    }


    return (
        <View style={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center"
        }}>      
            {Details && render()}
        </View>           
    );

    
}

const styles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        padding: 25,
    },
    price: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    description: {
        textAlign: "center",
        fontSize: 16,
        color: "#555",
    },
    modalContainer: {
        flex: 1,
    },
    modalContent: {
        padding: 20,
        borderRadius: 5,
        width: "80%",
    },
    modalText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    modalButton: {
        backgroundColor: "#007bff",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    modalButtonText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    container: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        backgroundColor: "#fff",
    },
    detailImage: {
        width: 250,
        height: 250,
        marginBottom: 20,
    },
    card: {
        maxWidth: 400,
    },
    cardTitle: {
        fontSize: 24,
        marginBottom: 10,
        textAlign: "center",
    },
    cardPrice: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    cardDescription: {
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        width: 400,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: "red",
        marginTop: 20,
    },
    buttonText: {
        textAlign: "center",
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

Details.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.number.isRequired
        })
    }),
};

export default Details;