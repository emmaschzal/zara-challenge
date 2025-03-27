import type { ProductFullInfo } from "@/app/types/ProductFullInfo";
import styles from "./styles/specs.module.css";

type Props = {
  specs?: ProductFullInfo["specs"];
};

export default function Specs({ specs }: Props) {
  if (!specs) return null;

  const productSpecs = [
    { label: "Screen", value: specs.screen },
    { label: "Resolution", value: specs.resolution },
    { label: "Processor", value: specs.processor },
    { label: "Main Camera", value: specs.mainCamera },
    { label: "Selfie Camera", value: specs.selfieCamera },
    { label: "Battery", value: specs.battery },
    { label: "Operating System", value: specs.os },
    { label: "Refresh Rate", value: specs.screenRefreshRate },
  ].filter((entry) => entry.value);

  return (
    <div className={styles.specsWrapper}>
      <p className={styles.title}>SPECIFICATIONS</p>
      <div>
        {productSpecs.map(({ label, value }) => (
          <div key={label} className={styles.wrapper}>
            <p className={styles.label}>{label}</p>
            <p className={styles.data}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
