import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants';
import CustomButton from '../components/CustomButton';

export default function App() {
    return (
        <SafeAreaView className="bg-primary h-full" >
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className='w-full justify-center items-center h-full px-4'>
                    <Image
                        source={images.logo}
                        className="w-[130px] h-[130px]"
                        resizeMode="contain"
                    />

                    <View className="relative mt-5">
                        <Text className="Text-3xl text-white font-bold text-center">Testing</Text>
                    </View>

                    <CustomButton
                        title="Continue with Email"
                        handlePress={() => router.push('/sign-in')}
                        containerStyles="w-full mt-7"
                    />
                </View>

            </ScrollView>

            <StatusBar backgroundColor='#161622' style='light' />

        </SafeAreaView>

    );
}