import {
  fontFamilyOptions,
  fontSizeOptions,
  fontWeightOptions,
} from "@/helpers/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const selectConfigs = [
  {
    property: "fontFamily",
    placeholder: "Choose a font",
    options: fontFamilyOptions,
  },
  { property: "fontSize", placeholder: "30", options: fontSizeOptions },
  {
    property: "fontWeight",
    placeholder: "Semibold",
    options: fontWeightOptions,
  },
];

type TextProps = {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  handleInputChange: (property: string, value: string) => void;
};

const Text = ({
  fontFamily,
  fontSize,
  fontWeight,
  handleInputChange,
}: TextProps) => (
  <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
    <h3 className="text-[10px] uppercase">Text</h3>

    <div className="flex flex-col gap-3">
      {selectConfigs.map((config) => (
        <RenderSelect
          key={config.property}
          config={config}
          value={
            config.property === "fontFamily"
              ? fontFamily
              : config.property === "fontSize"
                ? fontSize
                : fontWeight
          }
          handleInputChange={handleInputChange}
        />
      ))}
    </div>
  </div>
);

type RenderSelectProps = {
  config: {
    property: string;
    placeholder: string;
    options: { label: string; value: string }[];
  };
  value: string;
  handleInputChange: (property: string, value: string) => void;
};

const RenderSelect = ({
  config,
  value,
  handleInputChange,
}: RenderSelectProps) => (
  <Select
    onValueChange={(newValue) => handleInputChange(config.property, newValue)}
    value={value}
  >
    <SelectTrigger className="no-ring w-full rounded-sm border border-primary-grey-200">
      <SelectValue placeholder={config.placeholder} />
    </SelectTrigger>
    <SelectContent className="border-primary-grey-200 bg-primary-black text-primary-grey-300">
      {config.options.map((option) => (
        <SelectItem
          key={option.value}
          value={option.value}
          className=" hover:bg-primary-green hover:text-primary-black"
        >
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default Text;
