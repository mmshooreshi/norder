import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['title', 'font-extrabold text-6xl mb-3'],
    ['btn', 'px-4 py-1 border rounded-full inline-block hover:text-primary hover:bg-secondary dark:hover:text-secondary dark:hover:bg-primary text-dark dark:text-light cursor-pointer transition duration-200 ease-in-out hover:opacity-100 disabled:cursor-default disabled:bg-muted disabled:opacity-50'],
    ['icon-btn', 'hover:text-primary dark:hover:text-secondary inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100'],
    ['list', 'list-disc list-inside'],
    ['flex-center', 'flex items-center justify-center'],
    ['grid-center', 'grid place-items-center'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.5,
      warn: true,
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
  theme: {
    colors: {
      // Primary and secondary colors for light mode
      primary: '#FF6B6B', // Coral for primary elements
      secondary: '#4ECDC4', // Mint green for secondary elements
      accent: '#FFB400', // Bright yellow for accents like buttons or highlights
      background: '#FFFFFF', // White background for light mode
      text: '#333333', // Dark gray text for light mode
      muted: '#F0F0F0', // Muted light gray for disabled elements or secondary backgrounds

      // Primary and secondary colors for dark mode
      'dark-primary': '#8B0000', // Same coral for primary elements in dark mode
      'dark-secondary': '#4ECDC4', // Same mint green for secondary elements in dark mode
      'dark-accent': '#FFB400', // Bright yellow for accents in dark mode
      'dark-background': '#1B1B1B', // Dark background for dark mode
      'dark-text': '#EEEEEE', // Light gray text for dark mode
      'dark-muted': '#333333', // Muted dark gray for disabled elements or secondary backgrounds
    },
    fontFamily: {
      sans: ['Picoopic', 'sans-serif'],
      display: ['Picoopic', 'sans-serif'],
      text: ['Picoopic', 'sans-serif'],
    },
  },
});
