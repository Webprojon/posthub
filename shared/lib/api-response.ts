import { NextResponse } from "next/server";

type ApiErrorPayload = {
  message: string;
  status: number;
};

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  error: ApiErrorPayload;
};

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json<ApiSuccess<T>>(
    {
      success: true,
      data,
    },
    { status },
  );
}

export function errorResponse(message: string, status = 500) {
  return NextResponse.json<ApiError>(
    {
      success: false,
      error: {
        message,
        status,
      },
    },
    { status },
  );
}

