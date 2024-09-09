export async function fetchMenuItems() {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=c');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
  
      // Add a random price to each menu item
      const mealsWithPrice = (data.meals || []).map(meal => {
        // Generate a random price between 5 and 50 (or any desired range)
        const randomPrice = (Math.random() * (100000 - 50000) + 50000).toFixed(2); 
        return {
          ...meal,
          price: randomPrice
        };
      });
  
      return mealsWithPrice;
    } catch (error) {
      console.error('Error fetching menu items:', error);
      return [];
    }
  }
  