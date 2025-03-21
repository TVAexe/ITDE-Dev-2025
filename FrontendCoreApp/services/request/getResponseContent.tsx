const getResponseContent = async (response: Response | null): Promise<Blob | object | string | null> => {
    if (!response) return null;

    const contentType = response.headers.get("Content-Type");

    if (contentType) {
        if (contentType.includes("image") || contentType.includes("application/zip")) {
            return await response.blob();
        }

        if (contentType.includes("application/json")) {
            return await response.json();
        }
    }

    return await response.text();
};

export default getResponseContent;
