import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { SectionSwitch } from "./SectionSwitch";
import { SectionMoveButton } from "../SectionMoveButton/SectionMoveButton";
import { useState } from "react";

export default {
  title: "atoms/SectionSwitch",
  component: SectionSwitch.Container,
} as ComponentMeta<typeof SectionSwitch.Container>;

const SectionSwitchStory: ComponentStory<typeof SectionSwitch.Container> = (
  args
) => <SectionSwitch.Container {...args} />;

export const Default = SectionSwitchStory.bind({});

Default.decorators = [
  () => {
    const [currentSectionId, setCurrentSectionId] = useState("1");
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
            onClick={() => setCurrentSectionId("1")}
          />
          <SectionMoveButton
            title="섹션2"
            subTitle="섹션2로 이동"
            onClick={() => setCurrentSectionId("2")}
          />
        </div>
        <SectionSwitch.Container currentSectionId={currentSectionId}>
          <SectionSwitch.Item id="1">
            <div style={commonStyle}>
              <h1>Section1</h1>
            </div>
          </SectionSwitch.Item>
          <SectionSwitch.Item id="2">
            <div style={commonStyle}>
              <h1>Section2</h1>
            </div>
          </SectionSwitch.Item>
        </SectionSwitch.Container>
      </div>
    );
  },
];
