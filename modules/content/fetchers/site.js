import { mockFetch } from '../fixtures/mock-fetch.js';

const fetchSite = async (locale) => {
	try {
		const response = await mockFetch(`${process.env.API_URL}/${locale}/content/site`);

		if (!response.ok) {
			throw new Error(`Site content response failed: HTTP ${response.status}`);
		}

		const responseJson = await response.json();

		if (responseJson.status !== 200) {
			throw new Error(`Site content response returned error status: ${responseJson.status}`);
		}

		return responseJson;
	} catch (error) {
		if (error.message.includes('Site content')) {
			throw error;
		}
		throw new Error(`Failed to fetch site content: ${error.message}`, { cause: error });
	}
};

export { fetchSite };
