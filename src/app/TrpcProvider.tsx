"use client"

import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {httpBatchLink} from "@trpc/client"
import {useState} from "react"
import {api} from "../utils/trpc"

export const TrpcProvider: React.FC<{children: React.ReactNode}> = p => {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() =>
        api.createClient({
            links: [
                httpBatchLink({
                    url: `${process.env.BASE_URL}/api/trpc`
                })
            ],
        })
    )
    return (
        <api.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {p.children}
             </QueryClientProvider>
        </api.Provider>
    )
}