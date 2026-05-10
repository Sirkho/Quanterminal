# Quanterminal

Quanterminal is a modern cryptocurrency terminal built with React, TypeScript, and Vite. It provides real-time market data, coin information, and a dashboard for tracking your favorite cryptocurrencies. The project leverages Supabase for potential backend services and a clean, responsive UI with Tailwind CSS.

## Features

*   **Real-time Market Data**: Displays up-to-date prices and market statistics for various cryptocurrencies.
*   **Coin Information**: Detailed views for individual cryptocurrencies.
*   **Interactive Dashboard**: A customizable dashboard to monitor selected coins.
*   **Responsive Design**: Built with Tailwind CSS for a seamless experience across devices.
*   **Type-safe Development**: Developed using TypeScript for robust and maintainable code.

## Technologies Used

*   **Frontend**: React, TypeScript, Vite
*   **Styling**: Tailwind CSS, PostCSS
*   **Backend/Database (potential)**: Supabase
*   **Icons**: Lucide React

## Setup and Installation

To get this project up and running locally, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Sirkho/Quanterminal.git
    cd Quanterminal
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or yarn install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    # or yarn dev
    ```

    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Project Structure

```
Quanterminal/
├── public/
├── src/
│   ├── components/       # Reusable UI components (e.g., CoinCard, CoinTable)
│   ├── services/         # API integration (e.g., api.ts for fetching crypto data)
│   ├── types/            # TypeScript type definitions (e.g., crypto.ts)
│   ├── utils/            # Utility functions (e.g., format.ts)
│   ├── App.tsx           # Main application component
│   ├── index.css         # Global styles
│   ├── main.tsx          # Entry point of the React application
│   └── vite-env.d.ts     # Vite environment type definitions
├── index.html            # Main HTML file
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite build configuration
└── ...                   # Other configuration files (Tailwind, PostCSS, ESLint)
```

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is open-source and available under the [MIT License](LICENSE).
