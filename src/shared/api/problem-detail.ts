interface ProblemDetail {
    detail?: string;
    errors?: Record<string, string>;
}

export async function readProblemMessage(response: Response, fallback: string): Promise<string> {
    const problem = await response.json().catch(() => null);
    const firstFieldError = problem?.errors ? Object.values(problem.errors)[0] : undefined;

    return firstFieldError || problem?.detail || fallback;
}