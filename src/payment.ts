export const createInvoice = (
    title: string,
    description: string,
    payload: string,
    providerToken: string,
    startParameter: string,
    currency: string,
    prices: { label: string; amount: number }[]
  ) => {
    return {
      title,
      description,
      payload,
      provider_token: providerToken,
      start_parameter: startParameter,
      currency,
      prices,
    };
  };
  