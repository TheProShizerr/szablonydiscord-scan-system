export interface TemplatesProps {
	authorId: string
	categories: string
	clickButtonUse?: number
	dateCreate: string
	description: string
	in: number
	link: string
	server?: string
	serverLink?: string
	templateId: string
	title: string
	usageCount: number
}

interface ApiKey {
	id: number
	apiKeyId: string
	name: string
	dateCreate: Date
	status: boolean
	secretKey: string
	reqCount: number
	successCount: number
	errorCount: number
	lastUsed?: Date
	monthlyUsage: number
	userId: string
}

interface Template {
	in: number
	templateId: string
	link: string
	categories: string
	dateCreate: string
	dateCreateSystem: Date
	title: string
	description?: string
	usageCount: number
	clickButtonUse?: number
	authorId: string
}

export interface User {
	avatar: string
	dateCreateAccount: Date
	emailVerified: boolean
	id: number
	limitApiKey: number
	register: boolean
	reports: boolean
	trustScore: number
	userId: string
	warnings: number
	api: ApiKey[]
	template: Template[]
}

export interface DiscordTemplate {
	creator: {
		avatar: string
		id: string
		username: string
	}
	serialized_source_guild: {
		channels: {
			name: string
			type: number
		}
		roles: {
			name: string
			color: number
		}
	}
	usage_count: number
}

export interface BaseInforamtion {
	title: string
	description: string
	categories: string
}
