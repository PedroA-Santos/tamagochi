import React, { useState } from 'react';
import { View, StyleSheet, Button, Text, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function telacadastro() {
    const [petName, setPetName] = useState('');
    const [selectedPet, setSelectedPet] = useState('dog');

    const handleConfirm = () => {
        console.log(`Nome do bichinho: ${petName} Tipo do Bichinho: ${selectedPet}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome do Bichinho:</Text>
            <TextInput
                style={styles.input}
                placeholder='Digite o nome do Bichinho'
                value={petName}
                onChangeText={setPetName}
            />

            <Text style={styles.label}>Selecione o tipo do Bichinho:</Text>
            <RNPickerSelect
                onValueChange={(value) => setSelectedPet(value)}
                items={[
                    { label: 'Cachorro', value: 'dog' },
                    { label: 'Gato', value: 'cat' },
                    { label: 'Pássaro', value: 'bird' },
                ]}
            />

            <Button title='Confirmar' onPress={handleConfirm} />
        </View>
    );
}

const styles = StyleSheet.create({
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
});


  