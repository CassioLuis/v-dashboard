import { cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        outlineSuccess: 'border-green-500 text-green-500',
        outlineWarning: 'border-yellow-500 text-yellow-500',
        outlineDanger: 'border-red-500 text-red-500',
        outlinePrimary: 'border-primary text-primary',
        secondarySuccess: 'text-green-500 border-transparent bg-secondary hover:bg-secondary/80',
        secondaryWarning: 'text-yellow-500 border-transparent bg-secondary hover:bg-secondary/80',
        secondaryDanger: 'text-red-500 border-transparent bg-secondary hover:bg-secondary/80',
        defaultSuccess: 'border-transparent bg-green-500 text-primary-foreground hover:bg-green-500/80',
        defaultWarning: 'border-transparent bg-yellow-500 text-primary-foreground hover:bg-yellow-500/80',
        defaultDanger: 'border-transparent bg-red-500 text-primary-foreground hover:bg-red-500/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

// {
//   'bg-green-100 text-green-800': td.value === 'Aprovado',
//   'bg-red-100 text-red-800': td.value === 'Cancelado',
//   'bg-orange-100 text-orange-800': td.value === 'Pendente'
// }"
