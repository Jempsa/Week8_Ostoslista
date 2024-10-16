import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { firestore } from './Config'; 
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore"; 

const ShoppingList = () => {
    const [item, setItem] = useState('');
    const [items, setItems] = useState([]);

    
    useEffect(() => {
        const fetchItems = async () => {
            const querySnapshot = await getDocs(collection(firestore, "shoppingList"));
            const fetchedItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setItems(fetchedItems);
        };

        fetchItems();
    }, []);

    const addItem = async () => {
        if (item.trim() === '') {
            return; // Ei voi lisätä tyhjää kenttää
        }

        try {
            const docRef = await addDoc(collection(firestore, "shoppingList"), {
                name: item,
                createdAt: new Date(),
            });

            setItems([...items, { id: docRef.id, name: item }]);
            setItem('');
        } catch (error) {
            Alert.alert("Virhe", "Tuotetta ei voitu lisätä.");
        }
    };

    const removeItem = async (id) => {
        try {
            await deleteDoc(doc(firestore, "shoppingList", id)); 
            
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            Alert.alert("Virhe", "Tuotetta ei voitu poistaa.");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Lisää ostos"
                placeholderTextColor="#888"
                value={item}
                onChangeText={setItem}
            />
            <Button title="Lisää" onPress={addItem} color="#f57c00" />
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => removeItem(item.id)}>
                        <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9', 
    },
    input: {
        height: 50,
        width: 300,
        borderColor: '#f57c00',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        fontSize: 18,
    },
    item: {
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    itemText: {
        fontSize: 18,
        color: '#333',
    },
});

export default ShoppingList;