
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-inter)', 'sans-serif'],
        headline: ['var(--font-alegreya)', 'serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        // Landing page palette ("caderno do professor")
        ink: {
          DEFAULT: '#1B2A4A',
          soft: '#3A4B6E',
          50: '#EEF2F9',
        },
        paper: '#FFFBF3',
        marker: {
          DEFAULT: '#FACC15',
          dark: '#CA9A06',
          light: '#FEF3C7',
        },
        coral: '#F0705A',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        darkPurple: 'hsl(var(--dark-purple))', 
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' }, 
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'cloud-drift-slow': {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(10px) translateY(4px)' },
          '50%': { transform: 'translateX(-10px) translateY(-6px)' },
          '75%': { transform: 'translateX(6px) translateY(-4px)' },
        },
        'cloud-drift-medium': {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(15px) translateY(6px)' },
          '50%': { transform: 'translateX(-15px) translateY(-9px)' },
          '75%': { transform: 'translateX(9px) translateY(-6px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 3px #f4d35e)' },
          '50%': { opacity: '0.4', filter: 'drop-shadow(0 0 10px #f4d35e)' },
        },
        'twinkle-colorful': {
            '0%':   { opacity: '0.3', backgroundColor: '#00ff00' },
            '20%':  { opacity: '1', backgroundColor: '#00ccff' },
            '40%':  { opacity: '0.6', backgroundColor: '#ffff66' },
            '60%':  { opacity: '1', backgroundColor: '#ffffff' },
            '80%':  { opacity: '0.6', backgroundColor: '#ff99cc' },
            '100%': { opacity: '1', backgroundColor: '#ff3333' },
        },
        'cta-shimmer': {
          '0%': { transform: 'translateX(-150%) skewX(-20deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '25%': { transform: 'translateX(250%) skewX(-20deg)', opacity: '0' },
          '100%': { transform: 'translateX(250%) skewX(-20deg)', opacity: '0' },
        },
        'cta-pulse-gentle': {
          '0%, 100%': {
            transform: 'scale(1)',
            boxShadow: '0 4px 0 0 #1B2A4A, 0 4px 14px 0 rgba(250, 204, 21, 0.35)',
          },
          '50%': {
            transform: 'scale(1.025)',
            boxShadow: '0 4px 0 0 #1B2A4A, 0 8px 24px 2px rgba(250, 204, 21, 0.6)',
          },
        },
        'cta-gleam': {
          '0%': {
            transform: 'translateX(-130%) skewX(-25deg)',
            opacity: '0',
          },
          '15%': {
            opacity: '0.85',
          },
          '30%': {
            transform: 'translateX(260%) skewX(-25deg)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(260%) skewX(-25deg)',
            opacity: '0',
          },
        },
        'cta-glow': {
          '0%, 100%': {
            boxShadow: '0 4px 0 0 #1B2A4A, 0 6px 16px -2px rgba(250, 204, 21, 0.35)',
          },
          '50%': {
            boxShadow: '0 4px 0 0 #1B2A4A, 0 10px 24px -2px rgba(250, 204, 21, 0.55)',
          },
        },
        'pulse-yellow-cta': {
          '0%, 100%': {
            transform: 'scale(1)',
            boxShadow: '0 0 0 0 hsla(48, 96%, 57%, 0.7)', 
          },
          '50%': {
            transform: 'scale(1.03)',
            boxShadow: '0 0 0 8px hsla(48, 96%, 57%, 0)', 
          },
        },
        'screen-glow': {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 8px rgba(135, 206, 235, 0.4)) drop-shadow(0 0 12px rgba(135, 206, 235, 0.3))',
          },
          '50%': {
            filter: 'drop-shadow(0 0 16px rgba(135, 206, 235, 0.6)) drop-shadow(0 0 24px rgba(135, 206, 235, 0.4))',
          },
        },
      },
      animation: {
        'cta-pulse-gentle': 'cta-pulse-gentle 2.4s ease-in-out infinite',
        'cta-gleam': 'cta-gleam 3.6s ease-in-out infinite',
        'cta-shimmer': 'cta-shimmer 6s ease-in-out infinite',
        'cta-glow': 'cta-glow 4s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-slow': 'fadeIn 1s ease-out',
        'fade-in-medium': 'fadeIn 0.7s ease-out',
        'fade-in-fast': 'fadeIn 0.5s ease-out',
        'cloud-drift-slow': 'cloud-drift-slow 50s ease-in-out infinite',
        'cloud-drift-medium': 'cloud-drift-medium 40s ease-in-out infinite',
        twinkle: 'twinkle 2s ease-in-out infinite',
        'twinkle-colorful': 'twinkle-colorful 3s ease-in-out infinite',
        'pulse-yellow-cta': 'pulse-yellow-cta 2s infinite',
        sparkle: 'sparkle 1.5s infinite alternate',
        'brilho-pulse': 'brilhoPulse 3s infinite ease-in-out',
        'screen-glow': 'screen-glow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
