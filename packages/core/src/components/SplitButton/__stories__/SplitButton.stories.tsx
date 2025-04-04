import React from "react";
/* eslint-disable react/no-children-prop */
import { createComponentTemplate } from "vibe-storybook-components";
import SplitButton from "../SplitButton";
import Button from "../../Button/Button";
import { Add, Announcement, Check, Download, Favorite, Moon, Sun, Upload } from "@vibe/icons";
import { createStoryMetaSettingsDecorator } from "../../../storybook";
import SplitButtonMenu from "../SplitButtonMenu/SplitButtonMenu";
import MenuItem from "../../Menu/MenuItem/MenuItem";
import Menu from "../../Menu/Menu/Menu";
import MenuTitle from "../../Menu/MenuTitle/MenuTitle";
import "./SplitButton.stories.scss";

const metaSettings = createStoryMetaSettingsDecorator({
  component: SplitButton,

  iconPropNamesArray: ["leftIcon", "rightIcon"],
  actionPropsArray: ["secondaryDialogContent", "onSecondaryDialogDidShow", "onSecondaryDialogDidHide", "onClick"]
});

export default {
  title: "Components/SplitButton",
  component: SplitButton,

  subcomponents: {
    SplitButtonMenu
  },

  argTypes: metaSettings.argTypes,
  decorators: metaSettings.decorators
};

const splitButtonTemplate = createComponentTemplate(SplitButton);

export const Overview = {
  render: splitButtonTemplate.bind({}),
  name: "Overview",

  args: {
    children: "Button",

    secondaryDialogContent: () => (
      <SplitButtonMenu id="split-menu">
        <MenuItem icon={Check} title="Hey" />
        <MenuItem icon={Announcement} title="There" />
      </SplitButtonMenu>
    )
  },
  parameters: {
    docs: {
      liveEdit: { isEnabled: false }
    }
  }
};

export const Types = {
  render: () => (
    <>
      <SplitButton
        children="Primary"
        secondaryDialogContent={
          <SplitButtonMenu id="split-menu">
            <MenuItem icon={Check} title="Hey" />
            <MenuItem icon={Announcement} title="There" />
          </SplitButtonMenu>
        }
      />
      <SplitButton
        children="Secondary"
        kind="secondary"
        secondaryDialogContent={
          <SplitButtonMenu id="split-menu">
            <MenuItem icon={Check} title="Hey" />
            <MenuItem icon={Announcement} title="There" />
          </SplitButtonMenu>
        }
      />
      <SplitButton
        children="Tertiary"
        kind="tertiary"
        secondaryDialogContent={
          <SplitButtonMenu id="split-menu">
            <MenuItem icon={Check} title="Hey" />
            <MenuItem icon={Announcement} title="There" />
          </SplitButtonMenu>
        }
      />
    </>
  ),

  name: "Types",

  parameters: {
    docs: {
      liveEdit: { scope: { Check, Announcement } }
    }
  }
};

export const Sizes = {
  render: () => (
    <>
      <SplitButton
        children="Small"
        size="small"
        secondaryDialogContent={
          <SplitButtonMenu id="split-menu">
            <MenuItem icon={Check} title="Hey" />
            <MenuItem icon={Announcement} title="There" />
          </SplitButtonMenu>
        }
      />
      <SplitButton
        children="Medium"
        size="medium"
        secondaryDialogContent={
          <SplitButtonMenu id="split-menu">
            <MenuItem icon={Check} title="Hey" />
            <MenuItem icon={Announcement} title="There" />
          </SplitButtonMenu>
        }
      />
      <SplitButton
        children="Large"
        size="large"
        secondaryDialogContent={
          <SplitButtonMenu id="split-menu">
            <MenuItem icon={Check} title="Hey" />
            <MenuItem icon={Announcement} title="There" />
          </SplitButtonMenu>
        }
      />
    </>
  ),

  name: "Sizes",
  parameters: {
    docs: {
      liveEdit: { scope: { Check, Announcement } }
    }
  }
};

export const SplitButtonWithIcons = {
  render: () => (
    <>
      <SplitButton
        leftIcon={Add}
        secondaryDialogContent={
          <SplitButtonMenu id="split-menu">
            <MenuItem icon={Check} title="Hey" />
            <MenuItem icon={Announcement} title="There" />
          </SplitButtonMenu>
        }
      >
        Left icon
      </SplitButton>
      <SplitButton
        rightIcon={Add}
        secondaryDialogContent={
          <SplitButtonMenu id="split-menu">
            <MenuItem icon={Check} title="Hey" />
            <MenuItem icon={Announcement} title="There" />
          </SplitButtonMenu>
        }
      >
        Right icon
      </SplitButton>
    </>
  ),

  name: "Split button with icons",
  parameters: {
    docs: {
      liveEdit: { scope: { Add, Check, Announcement } }
    }
  }
};

export const SplitButtonAsThePrimaryAction = {
  render: () => (
    <SplitButton
      children="Use template"
      secondaryDialogPosition="bottom-start"
      secondaryDialogContent={
        <SplitButtonMenu id="split-menu">
          <MenuItem icon={Download} title="Import template" />
          <MenuItem icon={Upload} title="Export template" />
        </SplitButtonMenu>
      }
    />
  ),

  name: "Split button as the primary action",
  parameters: {
    docs: {
      liveEdit: { scope: { Download, Upload } }
    }
  }
};

export const SecondarySplitButton = {
  render: () => (
    <>
      <SplitButton
        children="Export to CSV"
        kind="secondary"
        secondaryDialogPosition="bottom-start"
        secondaryDialogContent={
          <SplitButtonMenu id="split-menu">
            <MenuItem title="Export to PDF" />
            <MenuItem title="Export to DOCX" />
            <MenuItem title="Export to Excel" />
          </SplitButtonMenu>
        }
      />
      <Button>New item</Button>
    </>
  ),

  name: "Secondary split button"
};

export const CustomMenu = {
  render: () => (
    <SplitButton
      secondaryDialogContent={
        <Menu focusItemIndexOnMount={2} id="menu" size="medium">
          <MenuTitle caption="Look up, you might see" captionPosition={MenuTitle.positions.TOP} />
          <MenuItem icon={Sun} iconType="svg" title="The sun" />
          <MenuItem icon={Moon} iconType="svg" title="The moon" />
          <MenuItem icon={Favorite} iconType="svg" title="And the stars" />
        </Menu>
      }
    >
      Custom menu
    </SplitButton>
  ),

  name: "Custom menu",
  parameters: {
    docs: {
      liveEdit: { scope: { Sun, Moon, Favorite } }
    }
  }
};
