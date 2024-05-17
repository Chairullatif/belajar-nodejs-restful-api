import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
	loginUserValidation,
	registerUserValidation,
	getUserValidation,
	updateUserValidation
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (request) => {
	const user = validate(registerUserValidation, request);

	//check usernamenya udah ada belum menggunakan prisma
	const countUser = await prismaClient.user.count({
		// await adalah operator, prismaClient.user.count adalah promise
		where: {
			username: user.username,
		},
	});

	if (countUser === 1) {
		throw new ResponseError(400, "Username has already exists");
	}

	user.password = await bcrypt.hash(user.password, 10);

	return prismaClient.user.create({
		// await adalah operator, prismaClient.user.create adalah promise
		// await di sini dihilangkan karena di-return sebagai promise
		data: user,
		select: {
			username: true,
			name: true,
		},
	});
};

const login = async (request) => {
	// 1. Validasi input 
	const loginRequest = validate(loginUserValidation, request);

	// 2. Cek apakah ada atau tidak username di database
	const user = await prismaClient.user.findUnique({
		where: {
			username: loginRequest.username,
		},
		select: {
			username: true,
			password: true,
		},
	});

	// 3. Jika tidak ada, lempar error
	if (!user) {
		throw new ResponseError(401, "Username or password wrong");
	}

	// 4. Cek password apakah valid atau tidak, jika tidak lempar error
	const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
	if (!isPasswordValid) {
		throw new ResponseError(401, "Username or password wrong");
	}

	// 5. Buat token -> update ke database -> select untuk dapat tokennya
	const token = uuid().toString();
	return prismaClient.user.update({
		data: {
			token: token
		},
		where: {
			username: user.username
		}, 
		select: {
			token: true
		}
	});
};

const get = async (username) => {
	username = validate(getUserValidation, username);

	const user = await prismaClient.user.findUnique({
		where: {
			username: username
		},
		select: {
			username: true, 
			name: true
		}
	});

	if (!user) {
		throw new ResponseError(404, "user is not found");
	}

	return user;
}

const update = async (request) => {
	// 1. Validasi dahulu
	const user = validate(updateUserValidation, request);

	// 2. Cek apakah di database terdapat user tersebut,
	// 	  dengan cara menghitung jumlah total username tersebut
	const totalUserInDatabase = await prismaClient.user.count({
		where: {
			username: user.username
		}
	})

	if (totalUserInDatabase !== 1) {
		throw new ResponseError(404, "user is not found")
	}

	// 3. Masukkan data ke object
	const data = {};
	if (user.name) {
		data.name = user.name;
	}
	if (user.password) {
		data.password = await bcrypt.hash(user.password, 10);
	}

	// 4. Update object yang berisi data ke database
	return prismaClient.user.update({
		where: {
			username: user.username
		},
		data: data, 
		select: {
			username: true, 
			name: true
		}
	})
}

const logout = async (username) => {
	username = validate(getUserValidation, username);

	const user = await prismaClient.user.findUnique({
		where: {
			username: username
		}
	})

	if (!user) {
		throw new ResponseError(404, "user is not found");
	}

	return prismaClient.user.update({
		where: {
			username: username
		}, 
		data: {
			token: null
		}, 
		select: {
			username: true
		}
	})
}

export default {
	register,
	login,
	get, 
	update, 
	logout
};
