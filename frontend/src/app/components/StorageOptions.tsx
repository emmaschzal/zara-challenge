'use client';

import styles from "./styles/storageOptions.module.css";
import clsx from "clsx";

type StorageOption = {
  capacity: string;
  price: number;
};

type Props = {
    options: StorageOption[];
    selected: string;
    onSelect: (value: string) => void;
};



export default function StorageOptions({ options, selected, onSelect }: Props) {
    if (!options || options.length === 0) return null;
  
    return (
      <div className={styles.wrapper}>
        <p className={styles.label}>Storage ¿How much space do you need?</p>
        <div className={styles.storageWrapper}>
          <div className={styles.options}>
            {options.map((option) => (
              <button
                key={option.capacity}
                onClick={() => onSelect(option.capacity)}
                className={clsx(styles.option, {
                  [styles.active]: selected === option.capacity,
                })}
              >
                {option.capacity}
              </button>
            ))}
          </div>
      </div>
      </div>
    );
  }
  