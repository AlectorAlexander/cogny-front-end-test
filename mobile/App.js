import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Footer from "./src/components/Footes";
import Header from "./src/components/Header";
import firestore from "@react-native-firebase/firestore";
import Products from "./src/components/Products";
const shoes = firestore().collection("shoes");

export default function App() {
    const [cards, setCards] = useState([]);

    const getShoes = ( async () => {
        await shoes.get().then(((querySnapshot) => 
            querySnapshot.forEach((documentSnapshot) => {
                setCards((prev) => {
                    console.log(prev);
                    if (prev && prev.length > 0) {
                        return prev.concat(documentSnapshot.data());
                    }
                    return [documentSnapshot.data()];
                });
            })));
    });

    useEffect(() => {
        console.log("chamou");
        getShoes();
    },[]);

    return (
        <View style={styles.container}>
            <Header />
            <Text>Teste 2</Text>
            {cards && cards.length > 0 && 
        cards.map((card, i) => {
            return <Products key={i} card={card} />;
        })
            }
            <Footer/>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
