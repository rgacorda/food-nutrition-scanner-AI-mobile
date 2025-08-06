# AI Food Nutrition Scanner 🍽️📱

A React Native mobile app that uses AI to detect and display the nutritional content of food from photos. Powered by the [LogMeal API](https://www.logmeal.es/), this app provides quick insights into calories, carbohydrates, proteins, and fats — perfect for diet tracking and healthy living.

---

## ✨ Features

- 📷 **Image-based food detection**  
  Upload or capture food photos to analyze using AI.

- 📊 **Nutritional breakdown**  
  Instantly get estimates for calories, carbs, protein, and fats.

- 🗂 **Scan history**  
  View previously analyzed meals with ability to edit details.

- 📅 **Progress tracking**  
  Monitor daily nutritional goals, weight changes, streaks, and more.

- ⚙️ **Custom settings**  
  Update your height, weight, birthday, and personal goals.

---

## 🧠 Tech Stack

- **React Native**
- **Expo Router**
- **LogMeal API** for AI food recognition
- **Bolt.new** for UI prototyping
- **Local Storage** for data persistence (no cloud backend)

---

## 🖼️ Screens

- **Home Tab**  
  - Remaining calories/macros for the day  
  - Recent scans list

- **Progress Tab**  
  - Weight and calorie trends  
  - BMI, current vs. goal weight, and daily streaks

- **Settings Tab**  
  - Personal data management

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/ai-food-nutrition-scanner.git
cd ai-food-nutrition-scanner
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your LogMeal API Key

Create a `.env` file in the root directory:

```env
LOGMEAL_API_KEY=your_api_key_here
```

> 💡 You can get your API key from [LogMeal Developer Portal](https://developer.logmeal.es/).

### 4. Start the app

```bash
npx expo start
```

---

## 📦 Folder Structure

```
app/
├── index.tsx               # Main screen
├── progress.tsx            # Progress tracker
├── settings.tsx            # Profile & config
components/                 # UI components
lib/                        # Utilities and helpers
hooks/                      # Custom React hooks
assets/                     # Images & fonts
```

---

## 📄 License

MIT License © 2025

---

## 🙌 Acknowledgments

- [LogMeal API](https://www.logmeal.es/)
- [Expo](https://expo.dev/)
- [Bolt.new](https://bolt.new/)
