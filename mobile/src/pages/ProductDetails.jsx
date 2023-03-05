/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from "react";
import { AsyncStorage } from "react-native";
import { View } from "react-native";
import Details from "../components/Products/Details";

function ProductDetails() {
    const saveData = async () => {
        try {
            await AsyncStorage.setItem("cart", JSON.stringify([]));
            console.log("Data saved successfully");
        } catch (e) {
            console.log("Failed to save the data to the storage");
        }
    };
      

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem("cart");
            if (value !== null) {
                console.log("Data retrieved successfully");
                return true;
            } else {
                console.log("No data found");
                return false;
            }
        } catch (e) {
            console.log("Failed to fetch the data from storage");
            return false;
        }
    };


    useEffect(async () => {
        if (!await getData()) {
            return saveData();
        }
    });


    return (
        <View className="ProductDetails">
            <Details />
        </View>
    );
}

export default ProductDetails;