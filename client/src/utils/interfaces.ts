export interface IUser {
	id: number
	fullname: string
	email: string
	phone: string
}

export interface IUserCreate {
	fullname: string
	email: string
	phone: string
	password?: string
}

export interface IStudio {
	id: number
	name: string
	location: string
	description: string
	cost: number
}

export interface IStudioCreate {
	name: string
	location: string
	description: string
	cost: number
}

export interface IPhotographer {
	id: number
	fullname: string
	email: string
	phone: string
	work_exp: number
	cost: number
}

export interface IPhotographerCreate {
	fullname: string
	email: string
	password?: string
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
