import { Briefcase } from "lucide-react";
import { experienceConfig } from "@/pages/ProfilePage/config/formConfig";
import { getElement } from "../../form/getElement";

export const Step2 = ({ control, errors }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-3 text-lg font-semibold text-text-primary pb-2 border-b border-border-default/50">
      <Briefcase className="text-accent" />
      Step 2: Add Experience
    </div>
    <div>
      {experienceConfig.map((config) => {
        const Element = getElement(config.type);
        return (
          <Element
            key={config.name}
            control={control}
            {...config}
            errors={errors}
          />
        );
      })}
    </div>
  </div>
);
