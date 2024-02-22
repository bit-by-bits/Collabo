import { Label } from "../ui/label";
import { Input } from "../ui/input";

type DimensionOption = {
  label: string;
  property: string;
};

const dimensionsOptions: DimensionOption[] = [
  { label: "W", property: "width" },
  { label: "H", property: "height" },
];

type Props = {
  width: string;
  height: string;
  isEditingRef: React.MutableRefObject<boolean>;
  handleInputChange: (property: string, value: string) => void;
};

const Dimensions: React.FC<Props> = ({
  width,
  height,
  isEditingRef,
  handleInputChange,
}) => {
  const handleChange = (
    property: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleInputChange(property, e.target.value);
  };

  const handleBlur = () => {
    isEditingRef.current = false;
  };

  return (
    <section className="flex flex-col border-b border-primary-grey-200">
      <div className="flex flex-col gap-4 px-6 py-3">
        {dimensionsOptions.map((item) => (
          <div
            key={item.label}
            className="flex flex-1 items-center gap-3 rounded-sm"
          >
            <Label htmlFor={item.property} className="text-[10px] font-bold">
              {item.label}
            </Label>
            <Input
              type="number"
              id={item.property}
              placeholder="100"
              value={item.property === "width" ? width : height}
              className="input-ring"
              min={10}
              onChange={(e) => handleChange(item.property, e)}
              onBlur={handleBlur}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dimensions;