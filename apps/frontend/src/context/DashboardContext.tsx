"use client"
import React, { createContext, useContext, useEffect, useState } from "react"
import { User } from "@/components/interfaces/common"
import useWindowSize from "@/hooks/useWindowSize"
import { connectSocketBackend } from "@/lib/socket"
import { toast } from "sonner"

interface DashboardContextType {
	toggleView: () => void
	toggleViewNotification: () => void
	showSidebar: boolean
	notification: boolean
	user: User
	numberPeopleOnline: number
	updateUser: (newUser: User) => void
}

export const DashboardContext = createContext<DashboardContextType | null>(null)

export const DashboardProvider = ({ children, user: initialUser }: { children: React.ReactNode; user: User }) => {
	const [showSidebar, setShowSidebar] = useState<boolean>(true)
	const [notification, setNotification] = useState<boolean>(false)
	const [user, setUser] = useState<User>(initialUser)
	const [numberPeopleOnline, setNumberPeopleOnline] = useState<number>(0)
	const { width } = useWindowSize()
	const socket = connectSocketBackend()

	socket.on("apikey", message => {
		if (user.userId === message.userId) {
			const updateUser = {
				...user,
				api: user.api.map(el =>
					el.apiKeyId === message.apiKeyId
						? {
								...el,
								reqCount: message.reqCount,
								successCount: message.successCount,
								errorCount: message.errorCount,
								lastUsed: message.lastUsed,
								monthlyCount: message.monthlyCount,
								dailyCount: message.dailyCount,
							}
						: el
				),
			}
			setUser(updateUser)
		}
	})

	socket.on("notification", message => {
		if (message.data.userId === user.userId) {
			const type = message.data.type === "success" ? "success" : "error"
			const newNotifications = [message.data, ...user.notification]

			const updateUser = {
				...user,
				notification: newNotifications.splice(0, 4),
			}

			toast[type]("Nowe powiadomienie", {
				description: message.data.title,
			})

			setUser(updateUser)
		}
	})

	socket.on("online", message => {
		if (message.userId === user.userId) {
			const updateUser = {
				...user,
				status: true,
			}

			setUser(updateUser)
		}
		setNumberPeopleOnline(message.numberOnline)
	})

	socket.on("offline", message => {
		console.log(message)
		setNumberPeopleOnline(message.numberOnline)
	})

	useEffect(() => {
		if (width && width <= 1024) {
			setShowSidebar(false)
		} else {
			setShowSidebar(true)
		}
	}, [width])

	useEffect(() => {
		socket.emit("online", { userId: user.userId })

		return () => {
			socket.emit("offline", { userId: user.userId })
			socket.disconnect()
		}
	}, [user.userId, socket])

	const toggleView = (): void => {
		setShowSidebar(!showSidebar)
	}

	const toggleViewNotification = (): void => {
		setNotification(!notification)
	}

	const updateUser = (data: User) => {
		setUser(data)
	}

	return <DashboardContext.Provider value={{ showSidebar, toggleView, user, updateUser, notification, toggleViewNotification, numberPeopleOnline }}>{children}</DashboardContext.Provider>
}

export function useDashboardContext() {
	const ctx = useContext(DashboardContext)
	if (!ctx) {
		throw new Error("the context has not loaded yet")
	}

	return ctx
}
