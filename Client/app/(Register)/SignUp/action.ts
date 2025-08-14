// action.ts
export const Employeefetcher = <T>(url: string): Promise<T> => {
  return fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.json() as Promise<T>;
    });
};
