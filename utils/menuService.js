// utils/menuService.ts
export async function fetchMenuItems() {
  const cacheKey = 'menuItems';
  const cachedItems = localStorage.getItem(cacheKey);

  if (cachedItems) {
    return JSON.parse(cachedItems);
  }

  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=c');
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();

    const mealsWithPrice = (data.meals || []).map(meal => {
      const randomPrice = (Math.random() * (100000 - 50000) + 50000).toFixed(2);
      return { ...meal, price: randomPrice };
    });

    localStorage.setItem(cacheKey, JSON.stringify(mealsWithPrice));
    return mealsWithPrice;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
}
