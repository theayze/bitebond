import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addReview } from '../../lib/appwrite'; // Create a function to handle adding reviews

const ReviewForm = () => {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const navigation = useNavigation();
    const route = useRoute();
    const { businessId } = route.params;

    const handleSubmit = async () => {
        if (!rating || !comment) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            await addReview(businessId, rating, comment);
            Alert.alert('Success', 'Review added successfully');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <SafeAreaView className="bg-primary h-full px-4">
            <View className="mt-10">
                <Text className="text-xl text-white mb-4">Add a Review</Text>
                <TextInput
                    value={rating}
                    onChangeText={setRating}
                    placeholder="Rating (1-5)"
                    keyboardType="numeric"
                    className="bg-white p-4 mb-4 rounded-lg"
                />
                <TextInput
                    value={comment}
                    onChangeText={setComment}
                    placeholder="Comment"
                    className="bg-white p-4 mb-4 rounded-lg"
                    multiline
                />
                <TouchableOpacity onPress={handleSubmit} className="bg-secondary p-4 rounded-lg">
                    <Text className="text-white text-center">Submit Review</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ReviewForm;
