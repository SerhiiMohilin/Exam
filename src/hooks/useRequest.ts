import axios, { type Method, AxiosError } from "axios";
import { useState } from "react";

// Типы для возвращаемого значения
type State<T> = {
    data: T | null;
    loading: boolean;
    error: AxiosError | null;
};

// Тип для возвращаемого кортежа: [функция для вызова, состояние]
type ReturnType<RequestBody, ResponseBody> = [
    (body: RequestBody) => Promise<void>,
    State<ResponseBody>
];

export const useApiMutation = <RequestBody, ResponseBody>(
    url: string,
    method: Method
): ReturnType<RequestBody, ResponseBody> => {
    const [state, setState] = useState<State<ResponseBody>>({
        data: null,
        loading: false,
        error: null,
    });

    const makeRequest = async (body: RequestBody) => {
        setState({ data: null, loading: true, error: null });
        try {
            const response = await axios.request<ResponseBody>({
                url,
                method,
                data: body,
            });
            setState({ data: response.data, loading: false, error: null });
        } catch (err) {
            if (err instanceof AxiosError) {
                setState({ data: null, loading: false, error: err });
            }
        }
    };

    return [makeRequest, state];
};