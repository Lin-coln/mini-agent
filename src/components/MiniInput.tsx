import { BaseEventOrig, Input, View } from "@tarojs/components";

export default function MiniInput({
  value,
  placeholder,
  onInput,
  onValueChange,
  label,
}: {
  label?: string;
  value: string;
  onValueChange: (val: string) => unknown;
  placeholder?: string;
  onInput?: (
    event: BaseEventOrig<{
      value: string;
      cursor: number;
      keyCode: number;
    }>,
  ) => unknown;
}) {
  return (
    <View className="w-full">
      {label && (
        <View className="px-2 text-sm mb-2 text-neutral-100/60">{label}</View>
      )}
      <Input
        type="text"
        // password={true}
        value={value}
        placeholder={placeholder}
        onInput={(event) => {
          onInput && onInput(event);
          onValueChange(event.detail.value);
        }}
        className={[
          "w-full box-border",
          "px-2 h-10 rounded-md bg-neutral-950/30 text-neutral-100/70",
        ].join(" ")}
      />
    </View>
  );
}