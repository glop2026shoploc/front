import { cookies } from "next/headers";

type ApiFetchOptions = {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    headers?: Record<string, string>;
    body?: unknown;
};

export async function apiFetch(url:string, {method='GET',headers,body}:ApiFetchOptions={}): Promise<Response> {
    const token = (await cookies()).get("token")?.value;
    return await fetch(url,{
        method:method,
        headers: {
             "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...headers,
        },
         body: body !== undefined ? JSON.stringify(body) : undefined,}
    );
}

