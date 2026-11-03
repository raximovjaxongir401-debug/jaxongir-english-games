/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1c2b2a",
        paper: "#f6f1e4",
        paper2: "#efe6d0",
        line: "#c9bd9c",
        teal: {
          DEFAULT: "#28524c",
          dark: "#173330",
          light: "#3a736b",
        },
        clay: "#b5502f",
        gold: {
          DEFAULT: "#c79a3d",
          light: "#dab55c",
        },
        success: "#2f7a4f",
        danger: "#b5402f",
      },
      fontFamily: {
        serif: ['"Iowan Old Style"', '"Palatino Linotype"', 'Georgia', 'serif'],
        mono: ['Menlo', '"Courier New"', 'monospace'],
      },
      boxShadow: {
        retro: '4px 4px 0px #1c2b2a',
        'retro-lg': '5px 5px 0px #1c2b2a',
        'retro-sm': '2px 2px 0px #1c2b2a',
        'retro-clay': '4px 4px 0px #b5502f',
        'retro-teal': '4px 4px 0px #173330',
        'retro-pressed': '1px 1px 0px #1c2b2a',
      },
      borderWidth: {
        '1.5': '1.5px',
      }
    },
  },
  plugins: [],
}
