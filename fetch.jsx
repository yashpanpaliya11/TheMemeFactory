export async function getMemes() {
  try {
    const res = await fetch("https://api.imgflip.com/get_memes");
    const json = await res.json();
    return json.data.memes;
  } catch (error) {
    console.log(error);
    return [];
  }
}