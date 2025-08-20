'use client'

import useSWR from "swr";
import { fetchUserStatus } from "./page/action";



export default function Dashboard() {

    const { data, error, isLoading } = useSWR(`${process.env.BASE_BACKEND_URL}/auth/status`, fetchUserStatus)

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error fetching user status</p>

     console.log('User payload:', data)


    return(
        <>
            Dashboard.
        </>
    )
}