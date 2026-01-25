import { AxiosError } from "axios";
import { toast } from "sonner";

interface ApiErrorResponse {
  message: string;
}

interface HandleRequestOptions {
  suppressUnauthorized?: boolean;
}

export const handleRequest = async <T>(
  requestCallback: () => Promise<T>,
  setLoading?: (loading: boolean) => void,
  options?: HandleRequestOptions,
): Promise<T | null> => {
  setLoading?.(true);

  try {
    return await requestCallback();
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const status = axiosError.response?.status;
    const message = axiosError.response?.data?.message?.toLowerCase();

    // 🔕 SILENT AUTH FAIL (Home / hydration)
    if (
      options?.suppressUnauthorized &&
      (status === 401 ||
        status === 403 ||
        message?.includes("invalid signature") ||
        message?.includes("jwt"))
    ) {
      return null;
    }

    // 🔔 Normal errors
    toast.error(
      axiosError.response?.data?.message || "An unexpected error occurred.",
    );

    return null;
  } finally {
    setLoading?.(false);
  }
};
