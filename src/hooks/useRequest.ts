import axios, { type Method, AxiosError } from "axios";
import { useEffect, useState } from "react";

type OptionsType<T = unknown> = {
    method: Method;
    headers?: Record<string, string>;
    body?: T;
};

type ReturnType<T = unknown> = [T | null, boolean, AxiosError | null];

export const useRequest = <RequestBody, ResponseBody>(
    url: string,
    options: OptionsType<RequestBody>
): ReturnType<ResponseBody> => {
    const [data, setData] = useState<ResponseBody | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        if (!data && !error) {
            const { method, body, headers } = options;

            setLoading(true);

            axios
                .request({ url, method, data: body, headers })
                .then(({ data }) => setData(data))
                .catch((err) => setError(err))
                .finally(() => setLoading(false));
        }
    }, [options, error, options, url]);

    return [data, loading, error];
};