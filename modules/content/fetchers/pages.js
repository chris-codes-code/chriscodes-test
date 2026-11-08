import { mockFetch } from '../fixtures/mock-fetch.js';

const fetchPages = async (locale) => {
	try {
		const response = await mockFetch(`${process.env.API_URL}/${locale}/content/pages`);

		if (!response.ok) {
			throw new Error(`Pages response failed: HTTP ${response.status}`);
		}

		const { data, status } = await response.json();

		if (status !== 200) {
			throw new Error(`Pages request returned error status: ${status}`);
		}

		return data;
	} catch (error) {
		if (error.message.includes('Pages')) {
			throw error;
		}
		throw new Error(`Failed to fetch pages: ${error.message}`, { cause: error });
	}
};

const fetchPage = async (locale, path) => {
	try {
		const response = await mockFetch(`${process.env.API_URL}/${locale}/content/page/${path}`);

		if (!response.ok) {
			throw new Error(`Page "${path}" response failed: HTTP ${response.status}`);
		}

		const responseJson = await response.json();

		if (responseJson.status !== 200) {
			throw new Error(`Page "${path}" returned error status: ${responseJson.status}`);
		}

		return responseJson;
	} catch (error) {
		if (error.message.includes('Page')) {
			throw error;
		}
		throw new Error(`Failed to fetch page "${path}": ${error.message}`, { cause: error });
	}
};

export { fetchPages, fetchPage };
