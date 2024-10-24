export interface IUser {
	id: number
	fullname: string
	email: string
	phone: string
}

export interface IStudio {
	id: number
	name: string
	location: string
	description: string
	cost: string
}

export interface IPhotographer {
	id: number
	fullname: string
	email: string
	phone: string
	work_exp: number
	cost: number
}

export interface IBooking {
	id: number
	date: Date
	people_number: number
	user: IUser
	studio: IStudio
	photographer: IPhotographer
}
