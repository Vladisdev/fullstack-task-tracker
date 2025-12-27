const backendUrl = import.meta.env.VITE_API_URL;

export const apiService = (path: string, fetchParams?: Omit<RequestInit, "method">) => {
    if (path.startsWith("/")) console.error('Path param mustn`t starts with "/"');

    const params: RequestInit = {
        headers: {
            "Content-Type": "application/json",
        },
        ...fetchParams,
    };

    return {
        get: async () => await fetch(`${backendUrl}/${path}`, params),
        post: async <ResponseType, BodyType>(body: BodyType): Promise<ResponseType> => {
            const response = await fetch(`${backendUrl}/${path}`, {
                ...params,
                method: "POST",
                body: JSON.stringify(body),
            });
            const payload = await response.json();

            return payload as ResponseType;
        },
    };
};
