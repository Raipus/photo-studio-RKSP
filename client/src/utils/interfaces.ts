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

export interface IBookingCreate {
	date: Date
	people_number: number
	user_id: number
	studio_id: number
	photographer_id: number
}
