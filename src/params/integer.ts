import type { ParamMatcher } from '@sveltejs/kit';

//Make sure param is number
export const match: ParamMatcher = (param) => {
	return /^\d+$/.test(param);
};