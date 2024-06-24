import { View, Text, ScrollView, Image, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';

import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignUp = () => {
    const { setUser, setIsLoggedIn } = useGlobalContext();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user' // Default role is 'user'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async () => {
        if (!form.username || !form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await createUser(form.email, form.password, form.username, form.role);

            // Set it to global state...
            setUser(result);
            setIsLoggedIn(true);

            router.replace('/home');
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[83vh] px-4 my-6">
                    <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[100px]" />
                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign Up</Text>

                    <FormField
                        title="Username"
                        value={form.username}
                        handleChangeText={(e) => setForm({ ...form, username: e })}
                        otherStyles="mt-10"
                    />

                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />

                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles="mt-7"
                        secureTextEntry
                    />

                    <View className="mt-7 flex-row justify-between">
                        <TouchableOpacity
                            onPress={() => setForm({ ...form, role: 'user' })}
                            className={`p-4 flex-1 mr-2 rounded-lg ${form.role === 'user' ? 'bg-secondary' : 'bg-white/20'}`}
                        >
                            <Text className={`text-center text-lg ${form.role === 'user' ? 'text-white' : 'text-gray-200'}`}>User</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setForm({ ...form, role: 'business' })}
                            className={`p-4 flex-1 ml-2 rounded-lg ${form.role === 'business' ? 'bg-secondary' : 'bg-white/20'}`}
                        >
                            <Text className={`text-center text-lg ${form.role === 'business' ? 'text-white' : 'text-gray-200'}`}>Business</Text>
                        </TouchableOpacity>
                    </View>

                    <CustomButton
                        title="Sign Up"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={isSubmitting}
                    />

                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-white font-pregular">
                            Already Signed Up?
                        </Text>
                        <Link href="/sign-in" className="text-lg font-psemibold text-secondary">Log In</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;
