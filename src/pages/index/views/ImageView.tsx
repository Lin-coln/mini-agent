import { Button, Image, Input, Textarea, View } from "@tarojs/components";
import sample from "../../../assets/sample_1.jpg";
import debounce from "../../../utils/debounce";
import { useEffect, useMemo, useRef, useState } from "react";
import Taro from "@tarojs/taro";

export default function ImageView() {
  const [value, setValue] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos eveniet nemo nisi! Commodi cumque dolore error excepturi exercitationem hic maxime, nam nesciunt, nobis obcaecati quia, repudiandae rerum voluptatum? Debitis, quidem?",
  );
  const [editing, setEditing] = useState(false);
  const setVisibleDebounced = useMemo(() => {
    return debounce((visible) => {
      setEditing(visible);
    }, 16);
  }, []);
  const [imageUrl, setImageUrl] = useState("");
  const submitAvailable = !!value.length;

  const handleSelectImage = async () => {
    const result = await new Promise((resolve) => {
      Taro.chooseImage({
        count: 1,
        sourceType: ["album"],
        complete: (result) => resolve(result),
      });
    });
    setImageUrl(sample);

    console.log(result);
  };
  const handleGenerate = async () => {
    setImageUrl("");
  };

  const items = [
    {
      label: "选择图片",
      hidden: editing,
      onClick: handleSelectImage,
    },
    {
      label: "编辑",
      hidden: editing || !imageUrl,
      onClick: () => setVisibleDebounced(!editing),
    },
    {
      label: "完成",
      hidden: !editing,
      onClick: () => setVisibleDebounced(false),
    },
    {
      label: "生成",
      loading: true,
      hidden: !submitAvailable || editing || !imageUrl,
      onClick: handleGenerate,
    },
  ];

  const renderImage = () => (
    <Image className="w-full h-full" src={imageUrl} mode={"aspectFit"} />
  );

  const renderEmpty = () => (
    <View
      className={[
        "w-full aspect-square rounded-3xl flex justify-center items-center",
        "text-xl font-bold text-neutral-300/20",
      ].join(" ")}
      onClick={() => handleSelectImage()}
    >
      点击添加图片
    </View>
  );

  return (
    <View
      className={[
        `relative`,
        `h-full`,
        `flex flex-col items-center justify-center`,
      ].join(" ")}
    >
      <View className="p-4 h-full shrink w-full flex flex-col justify-center items-center">
        {imageUrl ? renderImage() : renderEmpty()}
      </View>
      <Toolbar items={items} />
      <FullscreenInput
        value={value}
        onValueChange={setValue}
        visible={editing}
        onVisibleChange={setVisibleDebounced}
      />
    </View>
  );
}

function Toolbar({ items }) {
  return (
    <View
      className={[
        "fixed top-[180px] z-50",
        "left-1/2 -translate-x-1/2",
        "h-10 w-fit overflow-hidden",
        "bg-neutral-800/80 backdrop-blur-2xl rounded-2xl",
        "flex flex-row items-stretch",
      ].join(" ")}
    >
      {items
        .filter((item) => !item.hidden)
        .map((item, i) => (
          <View
            key={item.label}
            className={[
              "px-4 flex justify-center items-center",
              i === 0 ? "" : "border-l-2 border-neutral-500/40",
              item.active ? "text-neutral-800 font-bold bg-neutral-200/80" : "",
              item.disabled ? "text-neutral-100/20 bg-neutral-900/80" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => {
              if (item.disabled) return;
              item.onClick();
            }}
          >
            <View className="truncate text-center">{item.label}</View>
          </View>
        ))}
    </View>
  );
}

function FullscreenInput({ visible, onVisibleChange, value, onValueChange }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleInput = (e) => {
    onValueChange(e.detail.value);
  };
  const handleSetValue = (visible: boolean) => {
    onVisibleChange(visible);
  };
  useEffect(() => {
    if (!inputRef.current) return;
    const el = inputRef.current;
    if (visible) {
      el.focus();
    } else {
      el.blur();
    }
  }, [visible]);
  return (
    <View
      className={[
        "absolute top-0 left-0 overflow-hidden",
        "flex flex-col items-center justify-center",
        "h-full w-full",
        `p-4 box-border`,
        "pointer-events-none",
        ...(visible
          ? ["bg-neutral-900/90", "opacity-100"]
          : ["bg-neutral-900/90", "opacity-0"]),
      ].join(" ")}
      // onClick={() => visible && handleSetValue(!visible)}
    >
      <Textarea
        className={[
          "w-full",
          "text-center",
          "text-xl",
          ...(visible ? [`pointer-events-auto`] : [`pointer-events-none`]),
        ].join(" ")}
        value={value}
        ref={inputRef}
        maxlength={500}
        autoHeight={true}
        disabled={!visible}
        onInput={handleInput}
        showConfirmBar={false}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onFocus={() => {
          // setVisibleDebounced(true);
        }}
      />
    </View>
  );
}
