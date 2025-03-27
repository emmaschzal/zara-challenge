"use client";

import styles from "./styles/colorOptions.module.css";
import clsx from "clsx";

type ColorOption = {
  name: string;
  hexCode: string;
};

type Props = {
  colors: ColorOption[];
  selectedColor: string;
  onSelectColor: (name: string) => void;
};

export default function ColorOptions({
  colors,
  selectedColor,
  onSelectColor,
}: Props) {
  const selected = colors.find((color) => color.name === selectedColor);

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>COLOR. Pick your favourite</p>

      <div className={styles.options}>
        {colors.map((color) => (
          <div key={color.name} className={styles.optionWrapper}>
            <div 
              data-testid="color-swatch"
              role="button"
              aria-label={color.name}
              className={clsx(styles.colorSwatch, {
                [styles.active]: selectedColor === color.name,
              })}
              onClick={() => onSelectColor(color.name)}
            >
              <div
                className={styles.swatchFill}
                style={{ backgroundColor: color.hexCode }}
              />
            </div>
          </div>
        ))}
      </div>

      {selected && <span className={styles.colorName}>{selected.name}</span>}
    </div>
  );
}
