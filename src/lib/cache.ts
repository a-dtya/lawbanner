import { revalidateTag, unstable_cache } from "next/cache";
import { cache } from "react";

export type ValidTags = ReturnType<typeof getGlobalTag> | ReturnType<typeof getUserTag> | ReturnType<typeof getIdTag>

export const CACHE_TAGS = {
    products: "products",
    productViews: "product_views"
} as const

//global level caching
export function getGlobalTag(tag: keyof typeof CACHE_TAGS){
    return `global:${CACHE_TAGS[tag]}` as const
}

//user level caching
export function getUserTag(userId: string, tag: keyof typeof CACHE_TAGS){
    return `user:${userId}-${CACHE_TAGS[tag]}` as const
}

//id level caching
export function getIdTag(id: string, tag: keyof typeof CACHE_TAGS){
    return `id:${id}-${CACHE_TAGS[tag]}` as const
}


export function clearAllCache(){
    revalidateTag("*")
}

export function dbCache(cb: Parameters<typeof unstable_cache>[0], {tags}:{
    tags: ValidTags[]
}){
    cache(unstable_cache(cb, undefined, {tags: [...tags,"*"]}))
}
