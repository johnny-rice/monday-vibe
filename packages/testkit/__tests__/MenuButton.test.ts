import { test, expect, FrameLocator } from "@playwright/test";
import { MenuButton } from "../components/MenuButton";
import { menuButtonStory } from "./utils/url-helper";
import { Menu } from "../components/Menu";

let frame: FrameLocator;
let menuButton: MenuButton;
const menuButtonLocator = 'button[data-testid="menu-button"]';
const menuLocator = 'ul[role="menu"]';
const frameLocator = "[id='storybook-preview-iframe']";

test.describe("Testkit - Unit Tests - MenuButton", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(menuButtonStory);
    frame = page.frameLocator(frameLocator);
    const menu = new Menu(page, frame.locator(menuLocator), "Menu");
    menuButton = new MenuButton(page, frame.locator(menuButtonLocator), "Menu Button", menu);
    await page.reload();
    await menuButton.waitForElementToBeVisible();
    await menuButton.closeMenu();
  });

  test("should be enabled by default", async () => {
    await expect(menuButton.getLocator()).toBeEnabled();
  });

  test("should be visible by default", async () => {
    await expect(menuButton.getLocator()).toBeVisible();
  });

  test("should open menu when calling openMenu()", async () => {
    await menuButton.openMenu();
    await expect(menuButton.getLocator()).toBeVisible();
  });

  test("should close menu when calling closeMenu()", async () => {
    await menuButton.openMenu();
    await menuButton.closeMenu();
    expect(await menuButton.isMenuExpanded()).toBe(false);
  });

  test("should not change state when calling openMenu() on already opened menu", async () => {
    await menuButton.openMenu();
    await menuButton.openMenu();
    expect(await menuButton.isMenuExpanded()).toBe(true);
  });

  test("should not change state when calling closeMenu() on already closed menu", async () => {
    await menuButton.openMenu();
    await menuButton.closeMenu();
    await menuButton.closeMenu();
    expect(await menuButton.isMenuExpanded()).toBe(false);
  });

  test("should toggle menu state correctly with multiple open/close operations", async () => {
    await menuButton.openMenu();
    await menuButton.closeMenu();
    await menuButton.openMenu();
    await menuButton.closeMenu();
    expect.soft(await menuButton.isMenuExpanded()).toBe(false);
    await menuButton.openMenu();
    expect.soft(await menuButton.isMenuExpanded()).toBe(true);
    await menuButton.closeMenu();
    expect(await menuButton.isMenuExpanded()).toBe(false);
  });

  test("should handle hover operations", async () => {
    await menuButton.hover();
    await expect(menuButton.getLocator()).toBeVisible();
  });

  test("should count elements correctly", async () => {
    const count = await menuButton.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("should handle attribute retrieval", async () => {
    const attributeValue = await menuButton.getAttributeValue("data-vibe");
    expect(attributeValue).toContain("MenuButton");
  });
});
