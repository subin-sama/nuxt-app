<template>
  <div :class="badgeClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "flex items-center gap-2 rounded-md border px-2 py-1 transition-all duration-300 h-6 text-sm",
  {
    variants: {
      color: {
        primary: "bg-primary text-white",
        secondary: "bg-gray-200 text-gray-800",
        destructive: "bg-error text-white",
      },
    },
    compoundVariants: [
      {
        color: "primary",
        class: "border-primary text-primary",
      },
      {
        color: "secondary",
        class: "border-gray-300",
      },
      {
        color: "destructive",
        class: "border-error !text-error",
      },
      {
        color: "primary",
        class: "text-primary",
      },
    ],
    defaultVariants: {
      color: "primary",
    },
  }
);

type BadgeProps = VariantProps<typeof badgeVariants>;

const props = withDefaults(
  defineProps<{
    color?: BadgeProps["color"];
  }>(),
  {
    color: "primary",
  }
);
const badgeClasses = computed(() => {
  return badgeVariants({
    color: props.color,
  });
});
</script>
