"use client"

import { useDashboardContext } from "@/context/DashboardContext"
import { BarChart2 } from "lucide-react"
import { endOfMonth, formatDistanceToNow } from "date-fns"
import { pl } from "date-fns/locale"

export default function ApiLimitMonthly({ params }: { params: string }) {
	const { user } = useDashboardContext()
	const findApiKey = user.api.find(el => el.apiKeyId === params)
	const monthlyCount = findApiKey?.monthlyCount ?? 0
	const monthlyLimit = findApiKey?.monthlyLimit ?? 0
	const percentUsageMonthly = ((monthlyCount / monthlyLimit) * 100).toFixed(1)

	return (
		<div className="bg-boxColor p-5  rounded-xl flex-grow max-lg:w-full">
			<div className="flex justify-between">
				<div className="flex items-center gap-3">
					<BarChart2 className="text-silverColor" />
					<p>Limit na miesiąc</p>
				</div>
				<select id="options" className="p-2 bg-sidebarColor rounded-lg focus:ring-2 focus:ring-primaryColor focus:outline-none border-2 border-borderColor mt-1 pr-5">
					<option value="500">500 zapytań</option>
					<option value="1000">1000 zapytań</option>
					<option value="null">Bez limitu</option>
				</select>
			</div>
			<div className="bg-borderColor w-full h-2 rounded-xl mt-2">
				<div className="w-11/12 h-full bg-primaryColor rounded-xl"></div>
			</div>
			<div className="flex items-center justify-between mt-5">
				<div className="mt-2">
					<p className="text-silverColor">Wykorzystano</p>
					<p className="text-2xl my-1 font-medium">{monthlyCount}</p>
					<p className="text-silverColor text-sm">z {monthlyLimit} zapytań</p>
				</div>
				<div className="mt-2">
					<p className="text-2xl font-medium text-primaryColor text-right">{percentUsageMonthly}%</p>
					<p className="text-silverColor text-sm">Wykorzystano</p>
				</div>
			</div>
			<div className="w-full h-0.5 bg-borderColor my-3"></div>
			<div className="flex items-center justify-between text-silverColor text-md">
				<p>Resetuje się za:</p>
				<p>{formatDistanceToNow(endOfMonth(new Date()), { addSuffix: true, locale: pl })}</p>
			</div>
		</div>
	)
}
