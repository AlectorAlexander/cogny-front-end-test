import { NativeRouter, Route, Routes } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import Footer from "./src/components/Footes";
import Header from "./src/components/Header";
import Home from "./src/pages/Home";
import Provider from "./src/context/Provider";
import ProductDetails from "./src/pages/ProductDetails";

export default function App() {
    return (
        <NativeRouter>
            <View style={styles.container}>
                <Provider>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/details/:id" element={<ProductDetails />} />
                    </Routes>
                    <Footer/>
                    <StatusBar style="auto" />
                </Provider>
            </View>
        </NativeRouter>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
    },
});
