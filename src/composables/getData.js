export async function useGetData(url) {
  try {
    const data = await fetch(url);
    return await data.json();
  } catch (error) {
    console.error(error);
  }
}
