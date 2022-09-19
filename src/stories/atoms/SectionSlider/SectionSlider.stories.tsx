import type { ComponentStory } from "@storybook/react";
import { SectionSlider } from "./SectionSlider";
import { SectionMoveButton } from "../SectionMoveButton/SectionMoveButton";
import { useState } from "react";
export default {
  title: "atoms/SectionSlider",
};

const SectionSliderStory: ComponentStory<typeof SectionSlider.Container> = (
  args
) => <SectionSlider.Container {...args} />;

export const Default = SectionSliderStory.bind({});
Default.decorators = [
  () => {
    const [currentSection, setCurrentSection] = useState(0);
    const commonStyle = {
      backgroundColor: "gray",
      minHeight: "50vh",
      margin: "1em",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };
    return (
      <div>
        <div style={{ display: "flex", gap: "1em" }}>
          <SectionMoveButton
            title="섹션1"
            subTitle="섹션1로 이동"
            onClick={() => setCurrentSection(0)}
          />
          <SectionMoveButton
            title="섹션2"
            subTitle="섹션2로 이동"
            onClick={() => setCurrentSection(1)}
          />
        </div>
        <SectionSlider.Container currentSection={currentSection}>
          <SectionSlider.Item>
            <div style={commonStyle}>
              <h1>Section1</h1>
            </div>
          </SectionSlider.Item>
          <SectionSlider.Item>
            <div style={commonStyle}>
              <h1>Section2</h1>
            </div>
          </SectionSlider.Item>
        </SectionSlider.Container>
      </div>
    );
  },
];
