export const mockUseQuery = <TData>(
  querySpy: jest.SpyInstance,
  data: TData,
  props: {
    isSuccess?: boolean;
    isError?: boolean;
    isLoading?: boolean;
    error?: unknown;
  } = {},
) => {
  const { isSuccess = true, isError = false, isLoading = false, error } = props;

  querySpy.mockImplementation(() => {
    return {
      data,
      isSuccess,
      isLoading,
      isError,
      error,
    };
  });
};
