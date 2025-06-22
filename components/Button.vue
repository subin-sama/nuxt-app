<template>
  <div :class="buttonClasses" @click="props.onClick">
    <Icon v-if="props.icon" :name="props.icon" class="h-4 w-4" />
    <span v-if="props.label">{{ props.label }}</span>
  </div>
</template>

<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "flex cursor-pointer items-center gap-2 rounded-md border px-2 py-1 transition-all duration-300 hover:bg-gray-100",
  {
    variants: {
      color: {
        primary: "bg-primary text-white hover:bg-primary/80",
        secondary:
          "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
        destructive: "bg-error text-white hover:bg-error/80",
        gray: "bg-gray-200 text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
      },
      variant: {
        solid: "",
        outline: "border bg-transparent",
        ghost: "border-0 bg-transparent text-2xl",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-8",
      },
    },
    compoundVariants: [
      {
        color: "primary",
        variant: "outline",
        class:
          "border-primary text-primary hover:bg-primary/10 dark:text-primary/80 dark:border-primary/80 dark:hover:bg-primary/90",
      },
      {
        color: "secondary",
        variant: "outline",
        class: "border-gray-300 dark:border-gray-600",
      },
      {
        color: "destructive",
        variant: "outline",
        class: "border-error !text-error hover:bg-red-50",
      },
      {
        color: "primary",
        variant: "outline",
        class:
          "text-primary hover:bg-primary/10 dark:text-primary/80 dark:hover:bg-primary/90",
      },
      {
        color: "gray",
        variant: "ghost",
        class:
          "text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600",
      },
    ],
    defaultVariants: {
      color: "primary",
      variant: "solid",
      size: "md",
    },
  }
);

type ButtonProps = VariantProps<typeof buttonVariants>;

const props = withDefaults(
  defineProps<{
    color?: ButtonProps["color"];
    variant?: ButtonProps["variant"];
    size?: ButtonProps["size"];
    icon?: string;
    label?: string;
    onClick: () => void;
  }>(),
  {
    color: "primary",
    variant: "solid",
    size: "md",
  }
);
const buttonClasses = computed(() => {
  return buttonVariants({
    color: props.color,
    variant: props.variant,
    size: props.size,
  });
});
</script>
