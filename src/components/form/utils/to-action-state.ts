import { flattenError, ZodError } from "zod";

export type ActionState = {
  message: string;
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
};

export const fromErrorToActionState = (
  error: unknown,
  formData: FormData
): ActionState => {
  if (error instanceof ZodError) {
    const { fieldErrors } = flattenError(error);
    // in event of validation error with zod, return first error message
    return {
      message: "",
      fieldErrors,
      payload: formData,
    };
  } else if (error instanceof Error) {
    // if another error instance, return error message
    // i.e database error
    return {
      message: error.message,
      fieldErrors: {},
      payload: formData,
    };
  } else {
    // if not an error instance, but something else, return generic error message
    return {
      message: "An unknown error occurred",
      fieldErrors: {},
      payload: formData,
    };
  }
};
