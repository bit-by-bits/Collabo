import { Label } from "../ui/label";
import { Input } from "../ui/input";

type DimensionOption = {
  label: string;
  property: string;
};

const dimensionsOptions: DimensionOption[] = [
  { label: "Width", property: "width" },
  { label: "Height", property: "height" },
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
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleInputChange(property, e.target.value);
  };

  const handleBlur = () => {
    isEditingRef.current = false;
  };

  return (
    <section className="flex flex-col gap-3 border-b border-primary-grey-200 p-5">
      <h3 className="text-xs uppercase">Dimensions</h3>
      <div className="flex flex-col">
        {dimensionsOptions.map((item) => (
          <div
            key={item.label}
            className="flex flex-1 items-center gap-3 rounded-sm"
          >
            <Label htmlFor={item.property} className="text-xs font-bold">
              {item.label}
            </Label>
            <Input
              type="number"
              id={item.property}
              placeholder="100"
              value={item.property === "width" ? width : height}
              className="input-ring"
              min={10}
              onBlur={handleBlur}
              onChange={(e) => handleChange(item.property, e)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dimensions;
