import { View } from "@tarojs/components";

export default function MiniButton({
  className,
  onClick,
  label,
  disabled,
}: {
  label: string;
  className?: string;
  onClick: () => unknown;
  disabled?: boolean;
}) {
  return (
    <View
      className={[
        "px-4 py-2 rounded-md",
        `flex justify-center items-center`,
        disabled
          ? `bg-neutral-600/10 text-neutral-100/40`
          : `bg-neutral-400/10 text-neutral-100/70`,
        className,
      ].join(" ")}
      onClick={() => {
        if (disabled) return;
        onClick();
      }}
    >
      <View className="text-sm">{label}</View>
    </View>
  );
}
