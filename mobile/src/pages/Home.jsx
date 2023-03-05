import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import firestore from "@react-native-firebase/firestore";
import Products from "../components/Products/Products";
const shoes = firestore().collection("shoes");

export default function Home() {
    const [cards, setCards] = useState([]);

    const getShoes = ( async () => {
        await shoes.get().then(((querySnapshot) => 
            querySnapshot.forEach((documentSnapshot) => {
                setCards((prev) => {
                    if (prev && prev.length > 0) {
                        return prev.concat({...documentSnapshot.data(), id: documentSnapshot.id});
                    }
                    return [{...documentSnapshot.data(), id: documentSnapshot.id}];
                });
                
            })));
    });

    useEffect(() => {
        if (cards.length === 0) {
            getShoes();
        }
    },[]);

    return (
        <ScrollView style={{padding: 20, marginVertical: 70 }}>
            {cards && cards.length > 0 && 
        cards.map((card, i) => {
            return <Products key={i} card={card} />;
        })
            }
        </ScrollView>
    );
}

