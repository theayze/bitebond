import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import PostCard from '../../components/PostCard'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { icons } from '../../constants'

const Search = () => {
    const { query } = useLocalSearchParams()
    const { data: posts, refetch } = useAppwrite(() => searchPosts(query));
    const navigation = useNavigation();

    useEffect(() => {
        refetch()
    }, [query])


    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <PostCard post={item} />
                )}
                ListHeaderComponent={() => (
                    <View className="my-6 px-4">
                        <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center mb-4">
                            <Image source={icons.leftArrow} className="w-5 h-5 mr-2" resizeMode='contain' />
                            <Text className="text-white">Back</Text>
                        </TouchableOpacity>
                        <Text className="font-pmedium text-sm text-white">
                            Search Results
                        </Text>
                        <Text className="text-2xl font-psemibold text-white">
                            {query}
                        </Text>

                        <View className="mt-6 mb-8">
                            <SearchInput initialQuery={query} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Posts Found"
                        subtitle="No results found for your search query"
                    />
                )}
            />
        </SafeAreaView>
    )
}

export default Search