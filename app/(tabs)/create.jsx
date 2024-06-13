import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '../../constants'

const Create = () => {

    const [uploading, setUploading] = useState(false);
    const [form, setForm] = useState({
        title: '',
        post: null,
        thumbnail: null,
        prompt: '',
    })

    const submit = () => { }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView className="px-4 my-6">
                <Text className="text-2xl font-psemibold text-white">Upload Photo/Video</Text>
                <FormField
                    title="Video Title"
                    value={form.title}
                    placeholder="Enter video title"
                    handleChangeText={(e) => setForm({ ...form, title: e })}
                    otherStyles="mt-10"
                />

                <View className="mt-7 space-y-2">
                    <Text className="text-base text-gray-100 font-pmedium">
                        Upload Photo/Video
                    </Text>

                    <TouchableOpacity>
                        {form.post ? (
                            <Video
                                source={{ uri: form.post.uri }}
                                className="w-full h-64 rounded-2xl"
                                useNativeControls
                                resizeMode={ResizeMode.COVER}
                                isLooping
                            />
                        ) : (
                            <View className="w-full h-40 px-4 bg-primary border-2 border-white rounded-2xl justify-center items-center">
                                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                                    <Image source={icons.upload}
                                        resizeMode='contain' className="w-1/2 h-1/2"
                                    />
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <View className="mt-7 space-y-2">
                    <Text className="text-base font-pmedium text-gray-100">Thumbnail Image</Text>
                    <TouchableOpacity>
                        {form.thumbnail ? (
                            <Image
                                source={{ uri: form.thumbnail.uri }}
                                className="w-full h-64 rounded-2xl"
                                resizeMode='cover'
                            />
                        ) : (
                            <View className="w-full h-16 px-4 bg-primary border-2 border-white rounded-2xl justify-center items-center flex-row space-x-2">
                                <Image source={icons.upload}
                                    resizeMode='contain' className="w-5 h-5"
                                />
                                <Text className="text-sm text-gray-100 font-pmedium">Choose file</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <FormField
                    title="Category"
                    value={form.prompt}
                    placeholder="Select a category for your post"
                    handleChangeText={(e) => setForm({ ...form, title: e })}
                    otherStyles="mt-7"
                />

                <CustomButton
                    title="Upload"
                    handlePress={submit}
                    containerStyles="mt-7"
                    isLoading={uploading}
                />

            </ScrollView>
        </SafeAreaView>
    )
}

export default Create