import axios from 'axios';

const API_KEY = 'a1fead8847430da4090a83b7254fe6552eb92af0';
const SEGMENTATION_URL =
  'https://api.logmeal.com/v2/image/segmentation/complete';
const NUTRITION_URL = 'https://api.logmeal.com/v2/recipe/nutritionalInfo';

export async function analyzeImageWithLogMealFromUri(imageUri: string) {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    } as any); // 'as any' to bypass TS warning (React Native only)

    // Step 1: Upload image
    const segmentationRes = await axios.post(SEGMENTATION_URL, formData, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    const imageId = segmentationRes.data.imageId;
    if (!imageId) throw new Error('No imageId from segmentation response');

    // Step 2: Fetch nutrition
    const nutritionRes = await axios.post(
      NUTRITION_URL,
      { imageId },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Extract response data
    const data = nutritionRes.data;

    const foodName = Array.isArray(data.foodName)
  ? data.foodName[0]
      .split(' ')
      .map((word:string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  : 'Unnamed Dish';


    const nutrients = data?.nutritional_info?.totalNutrients ?? {};

    const calories = nutrients?.ENERC_KCAL?.quantity ?? 0;
    const carbs = nutrients?.CHOCDF?.quantity ?? 0;
    const protein = nutrients?.PROCNT?.quantity ?? 0;
    const fat = nutrients?.FAT?.quantity ?? 0;
    const nutriScore =
      data?.image_nutri_score?.nutri_score_standardized ?? null;

    return {
      foodName,
      calories,
      carbs,
      protein,
      fat,
      nutriScore,
    };
  } catch (err: any) {
    console.error('❌ LogMeal error:', err?.response?.data || err.message);
    return null;
  }
}
