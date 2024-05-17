import { ResponseError } from "../error/response-error.js";

const validate = (shcema, request) => {
	const result = shcema.validate(request, {
		abortEarly: false, 
		allowUnkown: false
	});
	if (result.error) {
		throw new ResponseError(400, result.error.message);
	} else {
		return result.value;
	}
};

export {
    validate
}