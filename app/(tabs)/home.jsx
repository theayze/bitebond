import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import PostCard from '../../components/PostCard'

const Home = () => {
    const { data: posts, refetch } = useAppwrite(getAllPosts);

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = async () => {
        setRefreshing(true);
        // re-call videos: if any new videos appeard
        await refetch();
        setRefreshing(false);
    }


    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <PostCard post={item} />
                )}
                ListHeaderComponent={() => (
                    <View className="my-6 px-4 space-y-6">
                        <View className="justify-between items-start flex-row mb-6">
                            <View>
                                <Text className="font-pmedium text-sm text-white">
                                    Hi,
                                </Text>
                                <Text className="text-2xl font-psemibold text-white">
                                    User
                                </Text>
                            </View>

                            <View className="mt-1.5">
                                <Image
                                    source={images.logoSmall}
                                    className="w-9 h-10"
                                    resizeMode='contain'
                                />
                            </View>
                        </View>

                        <SearchInput />

                        <View className="w-full flex-1 pt-5 pb-8">
                            <Text className="text-white text-lg font-pregular mb-3">
                                Trending
                            </Text>

                            <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Posts Found"
                        subtitle="Upload your first post now!"
                    />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </SafeAreaView>
    )
}

export default Home