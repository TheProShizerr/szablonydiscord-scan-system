"use client"
import React, { createContext, useContext, useEffect, useReducer } from "react"
import { OrderType } from "../types/order"
import { AppState } from "@/components/interfaces/order/common"

const initialState: AppState = {
	price: 0,
	offers: "basic",
	discount: 0,
	blocked: false,
	serverLink: "",
	serverName: "",
	serverId: "",
}

type Action = { type: "price"; payload: number } | { type: "offers"; payload: OrderType } | { type: "discount"; payload: number } | { type: "blocked"; payload: boolean }

const reducer = (state: AppState, action: Action): AppState => {
	switch (action.type) {
		case "price":
			return { ...state, price: action.payload }
		case "offers":
			return { ...state, offers: action.payload }
		case "discount":
			return { ...state, discount: action.payload }
		case "blocked":
			return { ...state, blocked: action.payload }
		default:
			return state
	}
}

interface OrderContextType {
	dispatch: React.Dispatch<Action>
	state: AppState
}

export const OrderContext = createContext<OrderContextType | null>(null)

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		const prices: Record<OrderType, number> = {
			basic: 5.5,
			premium: 12.5,
			advanced: 20.5,
		}

		dispatch({ type: "price", payload: prices[state.offers] })
	}, [state.offers])

	return <OrderContext.Provider value={{ dispatch, state }}>{children}</OrderContext.Provider>
}

export function useOrderContext() {
	const ctx = useContext(OrderContext)
	if (!ctx) {
		throw new Error("the context has not loaded yet")
	}

	return ctx
}
